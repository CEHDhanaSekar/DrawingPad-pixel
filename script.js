let container = document.getElementById('draw-container');
let gridBtn = document.getElementById('create-grid');
let gridClearBtn = document.getElementById('clear-grid');
let gridWidth = document.getElementById('width-range');
let gridHeight = document.getElementById('height-range');
let colorCode = document.getElementById('color-picker');
let eraseBtn = document.getElementById('erase-btn');
let paintBtn = document.getElementById('paint-btn');
let gridWidthVal = document.getElementById('width-range-val');
let gridHeightVal = document.getElementById('height-range-val');

const events = {
    mouse : {
        down : "mousedown",
        move : "mousemove",
        up : "mouseup",
    },
    touch : {
        down : "touchstart",
        move : "touchmove",
        up : "touchend",
    },
};

let deviceType = "";
let draw = false;
let erase = false;

const isTouchDevice = () => {
    try{
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch(e){
        deviceType = "mouse";
        return false;
    }
};

isTouchDevice();

gridBtn.addEventListener('mouseup', () => {

    eraseBtn.addEventListener('click', () => {
        erase = true;
        eraseBtn.classList.add('active');
        paintBtn.classList.remove('active');
    });
    
    paintBtn.addEventListener('click', () => {
        erase = false;
        paintBtn.classList.add('active');
        eraseBtn.classList.remove('active');
    });

    container.innerHTML = "";
    let count = 0;

    for(let i = 0; i< gridHeight.value; i++){
        count+=2;
        let div = document.createElement('div');
        div.classList.add('gridRow');
        for(let j = 0; j< gridWidth.value; j++){
            count+=2;
            let col = document.createElement('div');
            col.classList.add('gridCol');
            col.setAttribute('id', `gridCol${count}`);
            col.addEventListener(events[deviceType].down, (e) =>{
                draw = true ; 
                if(erase){
                    col.style.backgroundColor = "transparent";
                }
                else{
                    col.style.backgroundColor = colorCode.value;
                }
            });
            
            col.addEventListener(events[deviceType].move, (e) => {
                console.log(e)
                let elementId = document.elementFromPoint(
                    !isTouchDevice() ? e.clientX : e.touches[0].clientX,
                    !isTouchDevice() ? e.clientY : e.touches[0].clientY,
                ).id;
                console.log(elementId);
                checker(elementId);
            });

            col.addEventListener(events[deviceType].up, (e) =>{
                draw = false ;
            });

            div.appendChild(col);
        }
        container.appendChild(div);
    }
});

function checker(elementId){
    let gridColumns = document.querySelectorAll('.gridCol');
    gridColumns.forEach( (element) =>{
        if(element.id == elementId){
            if(draw && !erase){
                element.style.backgroundColor = colorCode.value;
            }
            else if(draw && erase){
                element.style.backgroundColor = "transparent";
            }
        }
    });
};

gridClearBtn.addEventListener('click', () => {
    container.innerHTML = "";
});

gridWidth.addEventListener('input', () =>{
    gridWidthVal.textContent = gridWidth.value <10 ? `0${gridWidth.value}` : gridWidth.value ;
});

gridHeight.addEventListener('input', () =>{
    gridHeightVal.textContent = gridHeight.value <10 ? `0${gridHeight.value}` : gridHeight.value ;
});

window.onload = () => {
    gridWidth.value = 0;
    gridHeight.value = 0;
};
