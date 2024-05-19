import { ChartType } from "./sales.model";

const linewithDataChart: ChartType = {
    chart: {
        height: 380,
        type: 'line',
        zoom: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
    },
    colors: ["#4e54c8"],
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 2,
        curve: 'smooth'
    },
    series: [{
        name: "High - 2018",
        data: [0, 100, 200, 150, 50, 0, 0, 50, 0, 50, 50, 50, 0, 100, 0]
    }
    ],
    grid: {
        row: {
            colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.2,
        },
        borderColor: '#f1f1f1',
    },
    markers: {
        style: "inverted",
        size: 6,
        hover: {
            size: 6,
        },
    },
    xaxis: {
        categories: ["22 Jul", "", "24 Jul", "", "26 Jul", "", "28 Jul", "", "30 Jul", "", "01 Aug", "", "03 Aug", "", "05 Aug"]
    },
    yaxis: {
        min: 0,
        max: 200,
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
    },
    responsive: [
        {
            breakpoint: 600,
            options: {
                chart: {
                    toolbar: {
                        show: false,
                    },
                },
                legend: {
                    show: false,
                },
            },
        },
    ],
};

//order count chart

const OrderCountChart: ChartType = {
    chart: {
        height: 350,
        type: 'line',
        zoom: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
    },
    colors: ["#4e54c8"],
    dataLabels: {
        enabled: false,
    },
    stroke: {
        width: 2,
        curve: 'smooth'
    },
    series: [{
        name: "High - 2018",
        data: [0, 2, 4, 3, 1, 0, 0, 1, 0, 1, 1, 1, 0, 2, 0]
    }
    ],
    // grid: {
    //     row: {
    //         colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
    //         opacity: 1,
    //     },
    //     column: {
    //         colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
    //         opacity: 1,
    //     },
    //     borderColor: '#4e54c8',
    // },
    markers: {
        style: "inverted",
        size: 6,
        hover: {
            size: 6,
        },
    },
    xaxis: {
        categories: ["22 Jul", "", "24 Jul", "", "26 Jul", "", "28 Jul", "", "30 Jul", "", "01 Aug", "", "03 Aug", "", "05 Aug"]
    },
    yaxis: {
        min: 0,
        max: 4,
    },
    responsive: [
        {
            breakpoint: 600,
            options: {
                chart: {
                    toolbar: {
                        show: false,
                    },
                },
                legend: {
                    show: false,
                },
            },
        },
    ],
};

export { linewithDataChart, OrderCountChart }
