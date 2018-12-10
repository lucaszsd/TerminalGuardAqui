if(localStorage.getItem("ocupado") == "false"){
    document.getElementById('btn-menu-retirar').disabled = 'disabled'; 
    document.getElementById('btn-menu-retirar').style.backgroundColor = "#E6E6E6";
}else{
    document.getElementById('btn-menu-guardar').disabled = 'disabled'; 
    document.getElementById('btn-menu-guardar').style.backgroundColor = "#E6E6E6";
}