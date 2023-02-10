var birds;
var pins = [];

d3.csv("ebird.csv").then(function (data) {
    birds = data;
    var button = d3.select('#button');
    var form = d3.select('#form');
    button.on('click', search);
    form.on('submit', search);
    //d3.select('#user-input').on('keyup', search);

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
    // This code is needed to prevent the page from reloading.
    d3.event.preventDefault(); 
    results();
}

function results(){
    // This line of code selects the <tbody> from the html and clears it. If this is not used, then the results would appear on top of the previous result.
    d3.select('.results').html('') 
    
    // This code will get the user's input from what the user will type in the html <input> since we assigned it the "user-input" id. It will get the value and store it in our inputValue variable
    var keyword = d3.select('#user-input').property("value");
    console.log(keyword);
    
    // This code will filter the birds looking at the actors column. It will store the values when there is a match from the text sequence the user entered and the text from our actors column from the CSV data.
    var filteredbirds = birds.filter(b => b.PRIMARY_COM_NAME.toLowerCase().includes(keyword.toLowerCase()));
    
    // This was the easiest approach I found to sort the results by a different column in descending order. I had to include a new script in my head to use the _.sortBy 
    //This is the script:  
    //<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/lodash.js/0.10.0/lodash.min.js"></script>
    //var output = _.sortBy(filteredbirds, 'TAXON_ORDER').reverse();

    // Once I had all the values in my output variable, all I needed was to loop through them and add them to the table one by one. This was done using d3, where I inserted the value for each one of the columns I wanted using the necessary html to fit each table row.
    for (var i = 0; i < filteredbirds.length; i++) {
        let num = filteredbirds[i]['TAXON_ORDER'];
        $('.results').append(
        '<div class=\'card\'>' +
            '<p class=\'common_name\'>' + (filteredbirds[i]['PRIMARY_COM_NAME']) + '</p>' +
            '<button type=\'button\' class=\'btn btn-link pin bi bi-heart\' id=\'' + filteredbirds[i]['TAXON_ORDER'] + '\'></button>' +
            '<div class=\'info\'>' +
            '<b><p class=\'tag\' id=\'sci_name\'>' + (filteredbirds[i]['SCI_NAME']).toUpperCase() + '</p></b>' +
            '<b><p class=\'tag\' id=\'order\'>' + (filteredbirds[i]['ORDER1']).toUpperCase() + '</p></b>' +
            '<b><p class=\'tag\' id=\'species\'>' + (filteredbirds[i]['SPECIES_GROUP']).toUpperCase() + '</p></b>' +
            '<b><p class=\'tag\' id=\'family\'>' + (filteredbirds[i]['FAMILY']).toUpperCase() + '</p></b>' +
            '</div>' +
        '</div>'
        )

        let button = document.getElementById(filteredbirds[i]['TAXON_ORDER']);
        console.log(button);

        button.addEventListener('click', ()=>{
            //$(button).toggleClass('bi-heart-fill bi-heart');
            if($(button).hasClass('bi-heart')){
                $(button).removeClass('bi-heart');
                $(button).addClass('bi-heart-fill');
            }
        

            if($(button).hasClass('bi-heart-fill')){
                $(button).removeClass('bi-heart-fill');
                $(button).addClass('bi-heart');
            }

        

            console.log(" is clicked");
            console.log('filteredbirds[i]: ' + (num));
            pins.push(num);

            console.log(pins);
            createPins();
        })
 
        // var button = $(output[i]['TAXON_ORDER']);
        
        // button.addEventListener("click", ()=>{
        //    console.log(output[i]['PRIMARY_COM_NAME'] + " is clicked");
        // })

    }

}

function createPins(){
    d3.select('.saved').html('');
    //d3.event.preventDefault(); 
    var pinnedbirds = birds.filter(b => {return pins.indexOf(b.TAXON_ORDER) !== -1});
    for(var i = 0; i < pinnedbirds.length; i++) {
        let num = pinnedbirds[i]['TAXON_ORDER'];
        $('.saved').append(
        '<div class=\'card savedCard\'>' +
            '<p class=\'common_name\'>' + (pinnedbirds[i]['PRIMARY_COM_NAME']) + '</p>' +
            '<button type=\'button\' class=\'btn btn-link pin bi bi-heart-fill\' id=\'' + pinnedbirds[i]['TAXON_ORDER'] + '\'></button>' +
            '<div class=\'info\'>' +
            '<b><p class=\'tag\' id=\'sci_name\'>' + (pinnedbirds[i]['SCI_NAME']).toUpperCase() + '</p></b>' +
            '<b><p class=\'tag\' id=\'order\'>' + (pinnedbirds[i]['ORDER1']).toUpperCase() + '</p></b>' +
            '<b><p class=\'tag\' id=\'species\'>' + (pinnedbirds[i]['SPECIES_GROUP']).toUpperCase() + '</p></b>' +
            '<b><p class=\'tag\' id=\'family\'>' + (pinnedbirds[i]['FAMILY']).toUpperCase() + '</p></b>' +
            '</div>' +
        '</div>'
        )

        let button = document.getElementById(pinnedbirds[i]['TAXON_ORDER']);
        
        console.log("pins before pop: " + pins);
        button.addEventListener('click', ()=>{
        //$(button).toggleClass('bi-heart bi-heart-fill');
            pins.pop(num);
            console.log("pins after pop: " + pins);
            d3.select('.saved').html('');
            if (pins.length == 0) {
                return;
            }
            else {
                results();
                createPins();
            }
        })
    }

}

function showCard(name, i) {
    
}

