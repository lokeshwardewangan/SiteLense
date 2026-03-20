const fs = require('fs');
const path = require('path');

const fileWalk = (dir, done) => {
    let results = [];
    fs.readdir(dir, (err, list) => {
        if (err) return done(err);
        let pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(file => {
            file = path.resolve(dir, file);
            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) {
                    if (!file.includes('node_modules') && !file.includes('.next') && !file.includes('brain')) {
                        fileWalk(file, (err, res) => {
                            results = results.concat(res);
                            if (!--pending) done(null, results);
                        });
                    } else {
                        if (!--pending) done(null, results);
                    }
                } else {
                    if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                        results.push(file);
                    }
                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

const replacements = {
    '@/components/about': '@/features/landing/components/about',
    '@/components/cta': '@/features/landing/components/cta',
    '@/components/faq': '@/features/landing/components/faq',
    '@/components/features-grid': '@/features/landing/components/features-grid',
    '@/components/hero': '@/features/landing/components/hero',
    '@/components/pricing': '@/features/landing/components/pricing',
    '@/components/supporting': '@/features/landing/components/supporting',
    '@/components/landing/feature-card': '@/features/landing/components/feature-card',
    '@/components/landing/gradient-text': '@/features/landing/components/gradient-text',
    '@/components/landing/section-wrapper': '@/components/shared/section-wrapper',
    '@/components/navbar': '@/components/layouts/navbar',
    '@/components/live-scanner': '@/features/scanner/components/live-scanner',
    '@/components/results': '@/features/scanner/components',
    '@/hooks/useScan': '@/features/scanner/hooks/useScan',
    '@/lib/services/scan.service': '@/features/scanner/services/scan.service',
    '@/lib/types/scan.types': '@/features/scanner/types/scan.types',
    '@/lib/validators/scan.validator': '@/features/scanner/validators/scan.validator',
    '@/lib/animations': '@/utils/animations',
    '@/lib/utils/error': '@/utils/error',
    '@/lib/utils/response': '@/utils/response',
};

fileWalk(process.cwd(), (err, files) => {
    if (err) throw err;
    files.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        let original = content;
        for (const [oldPath, newPath] of Object.entries(replacements)) {
            if (oldPath.includes('components/results')) {
                content = content.replace(new RegExp(`from ['"]${oldPath}(.*)['"]`, 'g'), `from '${newPath}$1'`);
            } else {
                content = content.replace(new RegExp(`from ['"]${oldPath}['"]`, 'g'), `from '${newPath}'`);
            }
        }
        if (content !== original) {
            fs.writeFileSync(file, content);
            console.log('Updated: ' + file);
        }
    });
});
