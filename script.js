$( document ).ready(function() {
    $("#convertCSV").click(function() {
        var csvData = $("#csvData").val();
        var jsonData = CSVToJSON(csvData);
        $("#jsonData").val(jsonData);
    });
});

function CSVToJSON(csvData) {
    var data = CSVToArray(csvData);
    var objData = [];
    for (var i = 1; i < data.length; i++) {
        objData[i - 1] = {};
        for (var k = 0; k < data[0].length && k < data[i].length; k++) {
            var key = data[0][k];
            if (key == "nationality"){
                break;
            }
            else {
            objData[i - 1][key] = data[i][k]
        }}
    }
    var jsonData = JSON.stringify(objData);
    jsonData = jsonData.replace(/},/g, "},\r\n");
    return jsonData;
}
function CSVToArray(csvData, delimiter) {
    delimiter = (delimiter || ",");
    var pattern = new RegExp((
        "(\\" + delimiter + "|\\r?\\n|\\r|^)" +
        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
        "([^\"\\" + delimiter + "\\r\\n]*))"), "gi");
    var data = [[]];
    var matches = null;
    while (matches = pattern.exec(csvData)) {
        var matchedDelimiter = matches[1];
        if (matchedDelimiter.length && (matchedDelimiter != delimiter)) {
            data.push([]);
        }
        if (matches[2]) {
            var matchedDelimiter = matches[2].replace(
                new RegExp("\"\"", "g"), "\"");
        } else {
            var matchedDelimiter = matches[3];
        }
        data[data.length - 1].push(matchedDelimiter);
    }
    return (data);
}




$( document ).ready(function() {
    $("#convertXML").click(function() {
        var xmlData = $("#csvData").val();
        var xmlDta = convertToXML(xmlData);
        $("#jsonData").val(xmlDta);
    });
});



//Function which is used to convert CSV data to XML
function convertToXML(csvData){
    var dataArr=csvData.split("\n");
    var heading=dataArr[0].split(",");
    var data=dataArr.splice(1,dataArr.length-1);
    var xmlData=document.createElement("XmlData");
    for(var i=0;i<data.length;i++){
        var d=data[i].split(",");
        var productData=document.createElement("Person");
        for(var j=0;j<d.length;j++){
            var tag=document.createElement(heading[j]);
            tag.innerHTML=d[j];
            productData.appendChild(tag)
        }
        xmlData.appendChild(productData);
    }
    return xmlData.innerHTML;

}