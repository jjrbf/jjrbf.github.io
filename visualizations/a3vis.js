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
        mark: {type: "circle", tooltip: true},
        data: {values:videogames},
        encoding : {
            x: {field: "Year", type:"quantitative", scale: {domain: [1981,2017]}},
            y: {type:"nominal", field: "Genre", title: 'Genre'},
            size: {field: "Global_Sales", aggregate: "sum", title: "Global Sales in millions"}
        },
    };

    vegaEmbed("#view2_1", yourVlSpec);
    
    yourVlSpec = {
        "width": 200,
        "height": 200,
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

    // Function to replace sales_region values
    const replaceSalesRegion = (gamesArray) => {
        gamesArray.forEach(game => {
        switch (game.sales_region) {
            case "na_sales":
            game.sales_region = "North America";
            break;
            case "jp_sales":
            game.sales_region = "Japan";
            break;
            case "eu_sales":
            game.sales_region = "Europe";
            break;
            case "other_sales":
            game.sales_region = "Other";
            break;
            default:
            console.log("Unknown sales region:", game.sales_region);
        }
        });
    };
    
    // Call the function to replace sales region values
    replaceSalesRegion(videogamesL);
    
    yourVlSpec = {
        "width": 200,
        "height": 200,
        "title": '',
        "data": {values: videogamesL},
        "transform": [
            {
                "aggregate": [{"op": "sum", "field": "sales_amount", "as": "total_sales"}],
                "groupby": ["platform", "sales_region"]
            },
            {
                "window": [{"op": "rank", "as": "rank"}],
                "sort": [{"field": "total_sales", "order": "descending"}],
                "groupby": ["platform"]
            }
        ],
        "mark": {"type": "bar", "tooltip": true},
        "encoding": {
            "facet": {
                "field": "platform",
                "type": "nominal",
                "columns": 4,
                "title": "Platform"
            },
            "y": {"field": "total_sales", "type": "quantitative", "title": "Total Amount of Sales in millions"},
            "x": {"field": "sales_region", "type": "nominal", "title": "Region"},
            "color": {
                "condition": {
                    "test": "datum.rank === 1",
                    "value": "red"  // Highlight color for the highest bar
                },
                "value": "steelblue"  // Default color for other bars
            }
        }
    };

    vegaEmbed("#view3", yourVlSpec);

    // Function to rename sales columns
    const renameSalesRegions = (gamesArray) => {
        gamesArray.forEach(game => {
        game.North_America = game.NA_Sales;
        game.Japan = game.JP_Sales;
        game.Europe = game.EU_Sales;
        game.Other = game.Other_Sales;
    
        // Optionally remove the old columns
        delete game.NA_Sales;
        delete game.JP_Sales;
        delete game.EU_Sales;
        delete game.Other_Sales;
        });
    };
    
    // Call the function to rename sales region columns
    renameSalesRegions(videogames);
    
    yourVlSpec = {
        "width": 800,
        "height": 400,
        title: "The Cultural Preference in Genre Between North America and Japan",
        "transform": [
            {filter: "datum.Year > 1980 && datum.Year < 2017"}
        ],
        data: {values:videogames},
        repeat: {layer: ["North_America", "Japan"]},
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