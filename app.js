var output;
var birds;

d3.csv("ebird.csv").then(function (data) {
    birds = data;
    var button = d3.select('#button');
    var form = d3.select('#form');
    button.on('click', search);
    form.on('submit', search);
    //d3.select('#user-input').on('keyup', search);
    
    output = data;
    // for (var i = 0; i < output.length; i++) {
    //     d3.select('.results').insert('tr').html(
    //     '<td>' + (output[i]['TAXON_ORDER'])+'</a>'+'</td>' + 
    //     '<td>' + (output[i]['CATEGORY'])+'</td>' +
    //     '<td>' + (output[i]['SPECIES_CODE'])+'</td>' +
    //     '<td>' + (output[i]['PRIMARY_COM_NAME'])+'</td> ' +
    //     '<td>' + (output[i]['SCI_NAME'])+'</td>'
    //     )
    //  }
});


// Defining the function
function search() {

    // This line of code selects the <tbody> from the html and clears it. If this is not used, then the results would appear on top of the previous result.
    d3.select('.results').html('') 
    
    // This code is needed to prevent the page from reloading.
    d3.event.preventDefault(); 
    
    // This code will get the user's input from what the user will type in the html <input> since we assigned it the "user-input" id. It will get the value and store it in our inputValue variable
    var keyword = d3.select('#user-input').property("value");
    console.log(keyword);
    
    // This code will filter the birds looking at the actors column. It will store the values when there is a match from the text sequence the user entered and the text from our actors column from the CSV data.
    var filteredbirds = 
    birds.filter(b => b.PRIMARY_COM_NAME.toLowerCase().includes(keyword.toLowerCase()));
    
    // This was the easiest approach I found to sort the results by a different column in descending order. I had to include a new script in my head to use the _.sortBy 
    //This is the script:  
    //<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/0.10.0/lodash.min.js"></script>
    //var output = _.sortBy(filteredbirds, 'TAXON_ORDER').reverse();
    output = filteredbirds;

    // Once I had all the values in my output variable, all I needed was to loop through them and add them to the table one by one. This was done using d3, where I inserted the value for each one of the columns I wanted using the necessary html to fit each table row.
    for (var i = 0; i < output.length; i++) {
        $('.results').append(
        '<div class=\'card\'>' +
            '<p class=\'common_name\'>' + (output[i]['PRIMARY_COM_NAME']) + '</p>' +
            '<button type=\'button\' class=\'btn btn-link pin\' id=\'pinBtn\'><span class=\'bi bi-heart\'></span></button>' +
            '<div class=\'info\'>' +
            '<b><p class=\'tag\' id=\'sci_name\'>' + (output[i]['SCI_NAME']).toUpperCase() + '</p></b>' +
            '<b><p class=\'tag\' id=\'order\'>' + (output[i]['ORDER1']).toUpperCase() + '</p></b>' +
            '<b><p class=\'tag\' id=\'species\'>' + (output[i]['SPECIES_GROUP']).toUpperCase() + '</p></b>' +
            '<b><p class=\'tag\' id=\'family\'>' + (output[i]['FAMILY']).toUpperCase() + '</p></b>' +
            '</div>' +
        '</div>'
        // '<td>' + (output[i]['TAXON_ORDER'])+'</a>'+'</td>' + 
        // '<td>' + (output[i]['CATEGORY'])+'</td>' +
        // '<td>' + (output[i]['SPECIES_CODE'])+'</td>' +
        // '<td>' + (output[i]['PRIMARY_COM_NAME'])+'</td> ' +
        // '<td>' + (output[i]['SCI_NAME'])+'</td>'
        )


    }
};

