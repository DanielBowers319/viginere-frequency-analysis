
const chartOptions = (i) => ({
    plugins: {
        title: {
            display: true,
            text: `Letter Frequency of letter ${i}`,
            color: '#fff',
            padding: {
                bottom: 5,
            }
        },
        legend: {
            display: false,
        },

    },
    responsive: true
})

export default chartOptions