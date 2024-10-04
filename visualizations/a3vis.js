// Create and render the bar chart
// async function to load data from datasets/videogames_long.csv using d3.csv and then make visualizations
async function render() {
    // load data
    const videogames =  await d3.csv("../data/videogames_wide.csv");
    const videogamesL =  await d3.csv("../data/videogames_long.csv");
    
    var yourVlSpec = {
        "width": 800,
        "data": {values: videogames},
        "mark": {type: "bar", tooltip: true},
        "encoding": {
          "x": {"field": "Global_Sales", "type": "quantitative", aggregate: "sum", title: 'Total Number of Global Sales (per million)'},
          "y": {"field": "Platform", "type": "nominal", sort:"-x"}
        }
    };

    vegaEmbed("#view1_1", yourVlSpec);
    
    yourVlSpec = {
        "width": 800,
        "data": {values: videogames},
        "mark": {type: "bar", tooltip: true},
        "encoding": {
        "x": {"field": "Global_Sales", "type": "quantitative", aggregate: "sum", title: 'Total Number of Global Sales (per million)'},
        "y": {"field": "Genre", "type": "nominal", sort:"-x"}
        }
    };

    vegaEmbed("#view1_2", yourVlSpec);
    
    yourVlSpec = {
        "width": 700,
        "height": 400,
        "transform": [
        {"filter": "datum.Year > 1980 && 2018"}
        ],
        mark: 'line',
        data: {values:videogames},
        encoding : {
        x: {field: "Year", type:"quantitative", scale: {domain: [1981,2017]}}
        }, 
        layer: [
        {
        encoding: {
            color: {field: "Genre", type: "nominal", "scale": {"scheme": "category20c"}},
            y: {type:"quantitative", field: "Global_Sales", aggregate : "sum", title: 'Total Number of Global Sales (per million)'}
        },
        layer: [
            {mark: "line"},
            {transform: [{filter: {param: "hover", empty: false}}], mark: "point"}
        ]
        },
        {
        transform: [{pivot: "Genre", value: "Global_Sales", groupby: ["Year"]}],
        mark: "rule",
        encoding: {
            opacity: {
            condition: {value: 0.3, param: "hover", empty: false},
            value: 0
            },
            tooltip: [
            {field: "Year", type: "quantitative"},
            {field: "Action", type: "quantitative"},
            {field: "Adventure", type: "quantitative"},
            {field: "Fighting", type: "quantitative"},
            {field: "Misc", type: "quantitative"},
            {field: "Platform", type: "quantitative"},
            {field: "Puzzle", type: "quantitative"},
            {field: "Racing", type: "quantitative"},
            {field: "Role-Playing", type: "quantitative"},
            {field: "Shooter", type: "quantitative"},
            {field: "Simulation", type: "quantitative"},
            {field: "Sports", type: "quantitative"},
            {field: "Strategy", type: "quantitative"}
            ]
        },
        params: [{
            name: "hover",
            select: {
            type: "point",
            fields: ["Year"],
            nearest: true,
            on: "pointerover",
            clear: "pointerout"
            }
        }]
        }]
    };

    vegaEmbed("#view2_1", yourVlSpec);
    
    yourVlSpec = {
        "width": 200,
        data: {values:videogames},
        "mark": {"type": "bar", tooltip: true},
        "encoding": {
        facet: {
            "field": "Platform",
            "type": "nominal",
            "columns": 4
        },
        x: {field: "Year", type:"quantitative"},
        y: {field: "Global_Sales", type:"quantitative", aggregate: "sum", title: "Total Number of Global Sales (per million)"}
        }
    };

    vegaEmbed("#view2_2", yourVlSpec);
    
    yourVlSpec = {
        "width": 200,
        "title": '',
        data: {values:videogamesL},
        "mark": {"type": "arc", tooltip: true},
        "encoding": {
            facet: {
                "field": "platform",
                "type": "nominal",
                "columns": 4,
                title: "Platform"
            },
            theta: {"field": "sales_amount", type:"quantitative", aggregate: "sum", "stack": "normalize", title: "Percentage of Sales"},
            color: {"field": "sales_region", type:"nominal", title: "Region", title: "Region"}
        }
    };

    vegaEmbed("#view3", yourVlSpec);
    
    yourVlSpec = {
        "width": 800,
        "height": 400,
        "transform": [
        {filter: "datum.Year > 1980 && datum.Year < 2017"}
        ],
        data: {values:videogames},
        repeat: {layer: ["NA_Sales", "EU_Sales", "JP_Sales", "Other_Sales"]},
        "spec": {
        mark: {type: 'bar', tooltip: true},
        "encoding": {
            "x": {
                "field": "Genre",
                "type": "nominal"
            },
            "y": {
                "aggregate": "mean",
                "field": {"repeat": "layer"},
                "type": "quantitative",
                "title": "Average Sales (in millions)"
            },
            "color": {"datum": {"repeat": "layer"}, "title": "Region"},
            "xOffset": {"datum": {"repeat": "layer"}}
            }
        },
        "config": {
        "mark": {"invalid": null}
        }
    };

    vegaEmbed("#view4", yourVlSpec);
}
  
render();