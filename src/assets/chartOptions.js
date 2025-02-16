
const chartOptions = (i) => ({
    plugins: {
        title: {
            display: true,
            text: `Frequency of letter ${i}`,
            font: {
                family: 'VT323',
                size: 24,
                weight: 'normal'
            },
            color: '#fff',
            padding: {
                bottom: 5,
            }
        },
        legend: {
            display: false,
        },

    },
    scales: {
        x: {
            grid: {
                color: '#fff',
                drawOnChartArea: false,
                drawTicks: false,
                drawBorder: true
            },
            ticks: {
                color: '#fff',
                font: {
                    family: 'VT323',
                    size: 20,
                    weight: 'normal'
                }
            }
        },
        y: {
            grid: {
                color: '#fff',
                drawOnChartArea: false,
                drawTicks: false,
                drawBorder: true
            },
            ticks: {
                color: '#fff',
                font: {
                    family: 'VT323',
                    size: 20,
                    weight: 'normal'
                }
            }
        },
    },
    responsive: true
})

export default chartOptions