const form = document.querySelector('form');
const paragon = document.getElementById('paragon')
//var myParagon = [
//   {LP: 1, NAZWA: "Jabłka", ILOŚĆ:1.5, CENA:3, SUMA:1.5*3},
//    {LP: 2, NAZWA: "Bułki", ILOŚĆ:5, CENA:3, SUMA:5*3}
//]
var freeindex
//window.localStorage.setItem("myParagon", JSON.stringify(myParagon));
var myParagon = JSON.parse(window.localStorage.getItem("myParagon"));
var table = document.getElementById("paragon");
var paragonTable = document.getElementById("paragonTable");
var selectedRow=null;
function displayTable(){
    var html='<table style="width:1000px" id=paragonTable> '
html+='<tr>'
html+='<th>'
html+='LP'
html+='</th>'
html+='<th>'
html+='NAZWA'
html+='</th>'
html+='<th>'
html+='ILOŚĆ'
html+='</th>'
html+='<th>'
html+='CENA'
html+='</th>'
html+='<th>'
html+='SUMA'
html+='</th>'
html+='</tr>'
let newxx = JSON.parse(window.localStorage.getItem("myParagon"));
var suma = 0;
    for(var i=0;i<myParagon.length;i++){
        
        html+='<tr>'
        html+="<td > " + newxx[i].LP +'</td>'
        html+="<td > "+ newxx[i].NAZWA +"</td>"
        html+="<td > " + newxx[i].ILOŚĆ +'</td>'
        html+="<td > " + newxx[i].CENA +' zł </td>'
        html+="<td > " + newxx[i].SUMA +' zł </td>'
        html+='<td> <button class=deleteBtn id='+i+'> Usuń </button></td>'
        html+='<td> <button id='+i+' onClick="onEdit(this)"> Edytuj </button></td>'
        if(i==0)
        {
        html+='<td> <button onClick="onUp(this)" disabled="true"> Do góry </button></td>'
        }
        else{
            html+='<td> <button onClick="onUp(this)"> Do góry </button></td>'
        }
        if(i==myParagon.length-1)
        {
            html+='<td> <button onClick="onDown(this)" disabled="true"> Do dołu </button></td>'
        }
        else{
            html+='<td> <button onClick="onDown(this)"> Do dołu </button></td>'
        }
        
        html+='</tr>'
        suma+=newxx[i].SUMA
    }

    html+='<tr>'
    html+='<td></td>'
    html+='<td></td>'
    html+='<td></td>'
    html+='<td><b>RAZEM</b></td>'
    html+='<td>'+suma +' zł</td>'
    html+='</tr>'
    paragon.innerHTML=html
resetForm()
}
displayTable()
function onAddWebsite(e){
    e.preventDefault()
    document.getElementById("AddOrEdit").innerHTML="Dodaj"
    var name = document.getElementById('name').value
    var count = document.getElementById('count').value
    var price = document.getElementById('price').value
    
    if (name==0||count<=0||price<=0){
        alert("Wszystkie pola muszą być wypełnione!!!\n(Ilość i cena muszą być większe od zera)")
    }
    else{
        price = parseFloat(price);
        count = parseFloat(count); 
    if((Number.isNaN(count)|| Number.isNaN(price))){
        alert("Cena i ilość muszą być liczbami!!!")
    }
    else{
    if(selectedRow!=null){
        var found = myParagon.find(myParagon=>myParagon.LP==selectedRow.cells[0].innerHTML)
        var indextochange = myParagon.indexOf(found)
myParagon[indextochange].NAZWA =name
myParagon[indextochange].ILOŚĆ = count
myParagon[indextochange].CENA = price
myParagon[indextochange].SUMA = count*price
selectedRow=null
    }
   
    else{
        //alert(myParagon[myParagon.length-1].LP)
        if(myParagon.length==0){
            myParagon.push({LP: 1, NAZWA:name, ILOŚĆ:count, CENA: price, SUMA:count*price})
        }
        else{
            findFreeLP()
myParagon.push({LP: freeindex, NAZWA:name, ILOŚĆ:count, CENA: price, SUMA:count*price})}}
   window.localStorage.setItem("myParagon", JSON.stringify(myParagon));
   displayTable()
        }}
}
function onDeleteRow(e){
    myParagon.splice(e.target.id,1)
    window.localStorage.setItem("myParagon", JSON.stringify(myParagon));
    displayTable()
    selectedRow=null
}


function onActionRow(e){
    if(e.target.classList.contains('deleteBtn'))
    onDeleteRow(e)

}

form.addEventListener("submit", onAddWebsite);
paragon.addEventListener('click', onActionRow);

function resetForm(){
    document.getElementById('name').value = ""
    document.getElementById('count').value = ""
    document.getElementById('price').value = ""
    selectedRow=null
}
function onEdit(td){
    document.getElementById("AddOrEdit").innerHTML="Edytuj"
    selectedRow = td.parentElement.parentElement
    var found = myParagon.find(myParagon=>myParagon.LP==selectedRow.cells[0].innerHTML)
    document.getElementById('name').value = found.NAZWA
    document.getElementById('count').value = found.ILOŚĆ
    document.getElementById('price').value = found.CENA
}

function onUp(td){
    document.getElementById("AddOrEdit").innerHTML="Dodaj"
    selectedRow = td.parentElement.parentElement
    var found = myParagon.find(myParagon=>myParagon.LP==selectedRow.cells[0].innerHTML)
   var indextochange = myParagon.indexOf(found)
    myParagon[indextochange]= myParagon[indextochange-1]
    myParagon[indextochange-1]=found
    window.localStorage.setItem("myParagon", JSON.stringify(myParagon));
    displayTable()
    
}
function onDown(td){
    document.getElementById("AddOrEdit").innerHTML="Dodaj"
    selectedRow = td.parentElement.parentElement
    var found = myParagon.find(myParagon=>myParagon.LP==selectedRow.cells[0].innerHTML)
   var indextochange = myParagon.indexOf(found)

    myParagon[indextochange]= myParagon[indextochange+1]
    myParagon[indextochange+1]=found
    window.localStorage.setItem("myParagon", JSON.stringify(myParagon));
    displayTable()
}
function findFreeLP(){
    for(var i=1;i<99999;i++)
{    
   if(!myParagon.find(myParagon=>myParagon.LP==i)){
      freeindex=i
      break;
   }

  
}

}