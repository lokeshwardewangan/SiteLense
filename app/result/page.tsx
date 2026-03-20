// app/result/page.tsx
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, Suspense, useMemo } from 'react';
import { useScan } from '@/features/scanner/hooks/useScan';
import { SectionWrapper } from '@/components/shared/section-wrapper';
import { Button } from '@/components/ui/button';
import {
  Globe,
  Zap,
  Activity,
  CheckCircle2,
  Search,
  ShieldCheck,
  ExternalLink,
  Timer,
  Gauge,
  Layout,
  Lock,
  ArrowUpRight,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { GlassCard, GradientHeading } from '@/components/ui/dashboard-elements';

// Import refactored components
import ScoreCard from '@/features/scanner/components/ScoreCard';
import ChartCard from '@/features/scanner/components/ChartCard';
import MetricCard from '@/features/scanner/components/MetricCard';
import OpportunityCard from '@/features/scanner/components/OpportunityCard';
import { useConfetti } from '@/hooks/useConfetti';

// --- Main Page Logic ---

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get('url');

  const { data, error, isLoading, executeScan } = useScan();
  const { fireConfetti } = useConfetti();

  useEffect(() => {
    if (url) {
      executeScan(url);
    }
  }, [url, executeScan]);

  // Trigger confetti only once when data is loaded
  useEffect(() => {
    if (data && !isLoading && !error) {
      fireConfetti();
    }
  }, [data, isLoading, error, fireConfetti]);

  const hostname = useMemo(() => {
    if (!url) return null;
    try {
      return new URL(url).hostname;
    } catch (e) {
      return null;
    }
  }, [url]);

  const barChartOptions = useMemo(() => ({
    chart: {
      id: 'metrics-bar',
      toolbar: { show: false },
      fontFamily: 'inherit',
      background: 'transparent',
    },
    xaxis: {
      type: 'category',
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { colors: '#94a3b8', fontWeight: 600 } },
    },
    yaxis: {
      labels: {
        style: { colors: '#94a3b8', fontWeight: 600 },
        formatter: (val: number) => val >= 1000 ? `${(val / 1000).toFixed(1)}s` : `${val}ms`,
      },
    },
    grid: {
      borderColor: '#f1f5f9',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
    },
    colors: ['#6366f1'],
    plotOptions: {
      bar: {
        columnWidth: '45%',
        borderRadius: 8,
        distributed: true,
      },
    },
    dataLabels: { enabled: false },
    tooltip: {
      theme: 'light',
      y: {
        formatter: (val: number) => val >= 1000 ? `${(val / 1000).toFixed(2)}s` : `${val}ms`,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ['#a855f7'],
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.85,
        stops: [0, 100]
      },
    },
  }), []);

  const radialChartOptions = useMemo(() => ({
    chart: {
      toolbar: { show: false },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 0,
          size: '70%',
          background: 'transparent',
        },
        track: {
          background: '#f1f5f9',
          strokeWidth: '97%',
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: '14px',
            fontWeight: 700,
            offsetY: -10,
            color: '#64748b'
          },
          value: {
            offsetY: 15,
            fontSize: '42px',
            fontWeight: 900,
            color: '#1e293b',
            formatter: (val: any) => val
          }
        }
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#a855f7'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: ['PERFORMANCE']
  }), []);

  if (!url || !hostname) {
    return (
      <SectionWrapper className="pt-28 md:pt-40">
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <AlertCircle className="mb-4 size-16 text-red-500" />
          <h1 className="mb-2 text-3xl font-black text-gray-900">Invalid Request</h1>
          <p className="text-lg text-gray-500">No valid URL was provided for scanning.</p>
          <Button onClick={() => router.push('/')} variant="default" className="mt-8 h-12 rounded-xl px-10 shadow-lg shadow-indigo-200">
            Go back to safety
          </Button>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper className="pt-28 pb-20 md:pt-32">
      {isLoading && (
        <div className="flex min-h-[60vh] flex-col items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-8 size-20 rounded-3xl border-4 border-indigo-600 border-t-transparent"
          />
          <h2 className="text-xl font-bold text-gray-900">Measuring performance...</h2>
          <p className="mt-2 text-gray-500 tracking-wide">Analyzing {hostname}</p>
        </div>
      )}

      {error && (
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-6 rounded-3xl bg-red-50 p-6 text-red-500">
            <AlertCircle className="size-12" />
          </div>
          <h1 className="mb-2 text-3xl font-black text-gray-900">Analysis Failed</h1>
          <p className="mb-10 max-w-md text-gray-500">{error}</p>
          <Button onClick={() => executeScan(url)} variant="outline" className="h-12 rounded-xl border-gray-200 px-8 transition-colors hover:bg-gray-50">
            Retry analysis
          </Button>
        </div>
      )}

      {data && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-12"
        >
          {/* Header Section */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-1.5 backdrop-blur-md"
            >
              <Globe className="size-4 text-indigo-600" />
              <span className="text-sm font-bold text-indigo-600">{hostname}</span>
              <a href={url} target="_blank" rel="noopener" className="ml-1 text-indigo-400 hover:text-indigo-600">
                <ExternalLink className="size-3" />
              </a>
            </motion.div>

            <GradientHeading className="mt-6 text-5xl md:text-6xl">
              Analysis Results
            </GradientHeading>
            <p className="mx-auto mt-4 max-w-xl text-lg font-medium text-gray-500">
              Complete performance audit and optimization report for your digital asset.
            </p>
          </div>

          {/* Top Score Cards Summary */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ScoreCard title="Performance" score={data.performance} icon={Zap} colorClass="text-emerald-500" />
            <ScoreCard title="SEO" score={data.seo} icon={Search} colorClass="text-blue-500" />
            <ScoreCard title="Accessibility" score={data.accessibility} icon={Layout} colorClass="text-purple-500" />
            <ScoreCard title="Security" score={data.bestPractices} icon={Lock} colorClass="text-indigo-500" />
          </div>

          {/* Detailed Charts Section */}
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <ChartCard
              title="Performance Score"
              type="radialBar"
              series={[data.performance]}
              options={radialChartOptions}
            />
            <ChartCard
              title="Field Data Metrics"
              type="bar"
              series={[{
                name: 'Value',
                data: [
                  { x: 'LCP', y: parseFloat(data.metrics.lcp) * 1000 },
                  { x: 'FCP', y: parseFloat(data.metrics.fcp) * 1000 },
                  { x: 'TBT', y: parseFloat(data.metrics.tbt) },
                  { x: 'CLS', y: parseFloat(data.metrics.cls) * 1000 },
                ]
              }]}
              options={barChartOptions}
            />
          </div>

          {/* Metrics and Opportunities Main Grid */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Left: Key Metrics */}
            <div className="lg:col-span-2">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-black text-gray-900 underline decoration-indigo-500/30 decoration-4 underline-offset-8">Key Metrics</h2>
                <div className="text-xs font-bold text-gray-400">VITALS</div>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <MetricCard label="LCP" value={data.metrics.lcp} icon={Timer} />
                <MetricCard label="FCP" value={data.metrics.fcp} icon={Gauge} />
                <MetricCard label="TBT" value={data.metrics.tbt} icon={Activity} />
                <MetricCard label="CLS" value={data.metrics.cls} icon={Layout} />
              </div>

              <GlassCard className="mt-6 bg-indigo-600 p-6 text-white dark:bg-indigo-700">
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-white/20">
                  <ArrowUpRight className="size-6" />
                </div>
                <h3 className="text-xl font-bold">Improve Your Score</h3>
                <p className="mt-2 text-sm text-indigo-100 opacity-90 leading-relaxed">
                  Based on our analysis, implementing the suggested changes could improve your LCP by up to 1.4s.
                </p>
                <Button variant="ghost" className="mt-4 h-9 border border-white/30 text-xs font-bold hover:bg-white hover:text-indigo-600 transition-colors">
                  VIEW FULL RECOMMENDATIONS
                </Button>
              </GlassCard>
            </div>

            {/* Right: Opportunities */}
            <div className="lg:col-span-3">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-black text-gray-900 underline decoration-purple-500/30 decoration-4 underline-offset-8">Optimization Opportunities</h2>
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                  <Clock className="size-3" /> SAVING TIME
                </div>
              </div>
              {data.opportunities.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {data.opportunities.map((opp, index) => (
                    <OpportunityCard
                      key={index}
                      title={opp.title}
                      description={opp.description}
                      displayValue={opp.displayValue}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex h-48 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50/30">
                  <CheckCircle2 className="mb-2 size-8 text-emerald-500" />
                  <p className="font-bold text-gray-400">Great job! No major opportunities found.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </SectionWrapper>
  );
}

export default function ResultPage() {
  return (
    <div className="min-h-screen bg-[#FDFDFF] selection:bg-indigo-100 selection:text-indigo-700">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <motion.div
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-lg font-black tracking-tighter text-gray-300"
            >
              SITE ANALYSIS
            </motion.div>
          </div>
        }
      >
        <ResultContent />
      </Suspense>
    </div>
  );
}
