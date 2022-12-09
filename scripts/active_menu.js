function active_menu(id){
    try{
        const item=document.getElementById(id).getElementsByTagName('a');
        console.log(item);
        const href=document.location.href;
        for(let i=0; i<item.length; i++){
            if (href === item[i].href){
                item[i].classList.add("act");
            }
        }
    } catch(e){}
}