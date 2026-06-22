import { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import CATEGORIES from '../data/categories';
import { formatRupiah } from '../utils/helpers';

// Register Chart.js modules
ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart({ transactions, theme }) {
    const expenses = useMemo(() => transactions.filter(t => t.type === 'expense'), [transactions]);

    const chartData = useMemo(() => {
        const catTotals = {};
        expenses.forEach(t => {
            catTotals[t.category] = (catTotals[t.category] || 0) + t.amount;
        });

        const labels = [];
        const data = [];
        const colors = [];

        Object.entries(catTotals).forEach(([key, val]) => {
            const cat = CATEGORIES[key];
            if (!cat) return;
            labels.push(cat.emoji + ' ' + cat.label);
            data.push(val);
            colors.push(cat.color || '#64748b');
        });

        return { labels, data, colors };
    }, [expenses]);

    const isDark = theme === 'dark';

    const chartConfig = {
        data: {
            labels: chartData.labels,
            datasets: [{
                data: chartData.data,
                backgroundColor: chartData.colors,
                borderColor: isDark ? '#111827' : '#ffffff',
                borderWidth: 3,
                hoverBorderColor: isDark ? '#1f2937' : '#f8fafc',
                hoverOffset: 12,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '62%',
            animation: {
                animateRotate: true,
                duration: 900,
                easing: 'easeOutQuart',
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: isDark ? '#94a3b8' : '#475569',
                        font: { family: "'Inter', sans-serif", size: 11, weight: '500' },
                        padding: 14,
                        usePointStyle: true,
                        pointStyleWidth: 10,
                    }
                },
                tooltip: {
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    titleColor: isDark ? '#f1f5f9' : '#0f172a',
                    bodyColor: isDark ? '#94a3b8' : '#475569',
                    borderColor: isDark ? 'rgba(16,185,129,0.2)' : 'rgba(0,0,0,0.08)',
                    borderWidth: 1,
                    cornerRadius: 10,
                    padding: 12,
                    bodyFont: { family: "'Inter', sans-serif" },
                    titleFont: { family: "'Inter', sans-serif", weight: '600' },
                    callbacks: {
                        label: function (ctx) {
                            return ' ' + formatRupiah(ctx.parsed);
                        }
                    }
                }
            }
        }
    };

    return (
        <div className="card chart-card" id="chart-card">
            <h3 className="card-heading">Pengeluaran per Kategori</h3>
            <div className="chart-container" id="chart-container">
                {expenses.length > 0 ? (
                    <Doughnut data={chartConfig.data} options={chartConfig.options} />
                ) : (
                    <p className="chart-empty-msg" style={{ display: 'block' }}>Belum ada data pengeluaran</p>
                )}
            </div>
        </div>
    );
}
