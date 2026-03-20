// features/scanner/components/PdfReport.tsx
'use client';

import React, { forwardRef } from 'react';
import type { ScanResponse } from '@/features/scanner/types/scan.types';
import {
  Globe,
  Zap,
  Search,
  Layout,
  Lock,
  Timer,
  Gauge,
  Activity,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import for ApexCharts since it needs window
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface PdfReportProps {
  data: ScanResponse;
  hostname: string;
  url: string;
}

const PdfReport = forwardRef<HTMLDivElement, PdfReportProps>(({ data, hostname, url }, ref) => {
  const barChartOptions = {
    chart: { toolbar: { show: false }, background: 'transparent' },
    xaxis: {
      categories: ['LCP', 'FCP', 'TBT', 'CLS'],
      labels: { style: { colors: '#64748b', fontWeight: 600 } },
    },
    colors: ['#6366f1'],
    plotOptions: { bar: { borderRadius: 6, columnWidth: '40%' } },
    dataLabels: { enabled: false },
    grid: { borderColor: '#f1f5f9' },
  };

  const radialOptions = {
    chart: { toolbar: { show: false } },
    plotOptions: {
      radialBar: {
        hollow: { size: '65%' },
        track: { background: '#f1f5f9' },
        dataLabels: {
          name: { show: true, fontSize: '14px', color: '#64748b', offsetY: -10 },
          value: { fontSize: '32px', fontWeight: 800, color: '#1e293b', offsetY: 10 },
        },
      },
    },
    colors: ['#6366f1'],
    labels: ['PERFORMANCE'],
  };

  return (
    <div
      ref={ref}
      className="pdf-report-layout"
      style={{
        width: '1024px',
        padding: '60px',
        backgroundColor: '#ffffff',
        color: '#1e293b',
        fontFamily: '"Overpass", sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            borderRadius: '50px',
            backgroundColor: '#f5f3ff',
            color: '#4f46e5',
            fontWeight: 800,
            border: '1px solid #ddd6fe',
            marginBottom: '20px',
          }}
        >
          <Globe size={18} />
          {hostname}
        </div>
        <h1 style={{ fontSize: '56px', fontWeight: 900, marginBottom: '10px', color: '#1e293b' }}>
          Scan Report
        </h1>
        <p style={{ fontSize: '18px', color: '#64748b', fontWeight: 500 }}>
          Comprehensive analysis for {url}
        </p>
      </div>

      {/* Score Cards - Flex layout for stability */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '50px' }}>
        {[
          { title: 'Performance', score: data.performance, icon: Zap, color: '#10b981' },
          { title: 'SEO', score: data.seo, icon: Search, color: '#3b82f6' },
          { title: 'Accessibility', score: data.accessibility, icon: Layout, color: '#a855f7' },
          { title: 'Security', score: data.bestPractices, icon: Lock, color: '#6366f1' },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              padding: '24px',
              borderRadius: '24px',
              border: '2px solid #f1f5f9',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                color: item.color,
                marginBottom: '12px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <item.icon size={28} />
            </div>
            <div style={{ fontSize: '36px', fontWeight: 900 }}>{item.score}</div>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 800,
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {item.title}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ display: 'flex', gap: '40px', marginBottom: '60px' }}>
        <div
          style={{
            flex: 1,
            padding: '30px',
            borderRadius: '24px',
            backgroundColor: '#f8fafc',
            border: '1px solid #f1f5f9',
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>
            Performance Overview
          </h3>
          <Chart
            options={radialOptions}
            series={[data.performance]}
            type="radialBar"
            height={280}
          />
        </div>
        <div
          style={{
            flex: 1,
            padding: '30px',
            borderRadius: '24px',
            backgroundColor: '#f8fafc',
            border: '1px solid #f1f5f9',
          }}
        >
          <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>
            Core Vitals (ms)
          </h3>
          <Chart
            options={barChartOptions}
            series={[
              {
                name: 'Value',
                data: [
                  parseFloat(data.metrics.lcp) * 1000,
                  parseFloat(data.metrics.fcp) * 1000,
                  parseFloat(data.metrics.tbt),
                  parseFloat(data.metrics.cls) * 1000,
                ],
              },
            ]}
            type="bar"
            height={280}
          />
        </div>
      </div>

      {/* Detailed Metrics Table */}
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '20px', color: '#4f46e5' }}>
          Key Performance Metrics
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          {[
            { label: 'Largest Contentful Paint', value: data.metrics.lcp, icon: Timer },
            { label: 'First Contentful Paint', value: data.metrics.fcp, icon: Gauge },
            { label: 'Total Blocking Time', value: data.metrics.tbt, icon: Activity },
            { label: 'Cumulative Layout Shift', value: data.metrics.cls, icon: Layout },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                width: 'calc(50% - 10px)',
                padding: '20px',
                borderRadius: '16px',
                border: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
              }}
            >
              <div style={{ color: '#6366f1' }}>
                <m.icon size={20} />
              </div>
              <div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>{m.label}</div>
                <div style={{ fontSize: '20px', fontWeight: 900 }}>{m.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Section */}
      <div style={{ pageBreakBefore: 'always', paddingTop: '40px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '25px', color: '#a855f7' }}>
          Opportunities & Recommendations
        </h2>
        {data.opportunities.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {data.opportunities.map((opp, i) => (
              <div
                key={i}
                style={{
                  padding: '24px',
                  borderRadius: '20px',
                  border: '1px solid #f1f5f9',
                  backgroundColor: '#ffffff',
                }}
              >
                <div
                  style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}
                >
                  <div style={{ fontWeight: 800, fontSize: '18px' }}>{opp.title}</div>
                  <div
                    style={{
                      color: '#eab308',
                      fontWeight: 800,
                      backgroundColor: '#fefce8',
                      padding: '4px 12px',
                      borderRadius: '8px',
                      fontSize: '14px',
                    }}
                  >
                    {opp.displayValue}
                  </div>
                </div>
                <p style={{ fontSize: '15px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  {opp.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '60px',
              borderRadius: '24px',
              backgroundColor: '#f0fdf4',
              border: '2px dashed #22c55e',
            }}
          >
            <CheckCircle2 size={40} color="#10b981" style={{ marginBottom: '15px' }} />
            <h3 style={{ color: '#166534', fontWeight: 800 }}>Perfect Score!</h3>
            <p style={{ color: '#15803d', fontWeight: 500 }}>
              No major optimization opportunities found for this page.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: '100px',
          paddingTop: '30px',
          borderTop: '1px solid #f1f5f9',
          textAlign: 'center',
          fontSize: '14px',
          color: '#94a3b8',
          fontWeight: 500,
        }}
      >
        Report generated by SiteLense •{' '}
        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
      </div>
    </div>
  );
});

PdfReport.displayName = 'PdfReport';

export default PdfReport;
