export function getPositionAtCenter(element) {
    const {top, left, width, height} = element.getBoundingClientRect();
    return {
        x: left + width / 2,
        y: top + height / 2
    };
}

export function getDistanceBetweenElements(a, b) {
    const aPosition = getPositionAtCenter(a);
    const bPosition = getPositionAtCenter(b);

    return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);  
}

export function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }

export function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

export function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {

    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    var CSV = '';
    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }
        row = row.slice(0, -1);
        //append Label row with line break
        CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }
        row.slice(0, row.length - 1);
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    //this trick will generate a temp "a" tag
    var link = document.createElement("a");
    link.id = "lnkDwnldLnk";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);

    var csv = CSV;
    var blob = new Blob([csv], { type: 'text/csv' });
    var csvUrl = window.webkitURL.createObjectURL(blob);
    var filename =  (ReportTitle || 'UserExport') + '.csv';
    return {
        'download': filename,
            'href': csvUrl
    };
}

export const downloadCSVFromJson = (filename, arrayOfJson) => {
    // convert JSON to CSV
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(arrayOfJson[0])
    let csv = arrayOfJson.map(row => header.map(fieldName => 
    JSON.stringify(row[fieldName], replacer)).join(','))
    csv.unshift(header.join(','))
    csv = csv.join('\r\n')
  
    // Create link and download
    var link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURIComponent(csv));
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };