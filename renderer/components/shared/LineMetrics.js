import { Line } from 'react-chartjs-2';

const LineMetrics = ({ dataLine, title }) => {
    return (
        <div className="border-bottom">
            <div className="h-64 mb-16">
                <h5 className="nav-group-title mb-5">{title}</h5>
                {
                    dataLine &&
                    <Line data={dataLine} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true,
                                    userCallback: function (label, index, labels) {
                                        // when the floored value is the same as the value we have a whole number
                                        if (Math.floor(label) === label) {
                                            return label;
                                        }

                                    },
                                }
                            }],
                        }
                    }} />}
            </div>
            <style jsx>{`
                .border-bottom {
                    border-bottom: 1px solid #ddd;
                }
            `}</style>
        </div>
    )
}

export default LineMetrics