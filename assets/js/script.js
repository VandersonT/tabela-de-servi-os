/*---------------------------*/
/*     Global-Variables    - */
/*---------------------------*/
let url = "http://127.0.0.1:5500";






/*---------------------------*/
/*     Global-Functions    - */
/*---------------------------*/
    function getTableData(){

        let table = document.querySelector('table');
        let prices;
        let days;
        let workers;
        let tableData = [];
        
        /*Get days from table*/
        cells = table.querySelectorAll("td:nth-child(1)");
        days = [];

        cells.forEach(function(cell) {
            days.push(cell.innerText);
        });

        /*Get workers from table*/
        cells = table.querySelectorAll("td:nth-child(2)");
        workers = [];

        cells.forEach(function(cell) {
            workers.push(cell.innerText);
        });

        
        /*Get prices from table*/
        cells = table.querySelectorAll("td:nth-child(3)");
        prices = [];

        cells.forEach(function(cell) {
            prices.push(cell.innerText);
        });

        tableData.push(days, workers, prices);
        
        return tableData;
    }

    function brasilianRealFormat(valor) {
        const opcoes = { style: "currency", currency: "BRL" };
        return valor.toLocaleString("pt-BR", opcoes);
    }


    function setWorkersFieldToWatch(){
        let tableLines = document.querySelectorAll('table tr');

        for(let i = 1; i < tableLines.length; i++){
            let workersField = tableLines[i].querySelectorAll('td')[1];
            
            workersField.addEventListener('keyup', function(){
                calculatePrice();
            });
        }
    }
    setWorkersFieldToWatch();





/*---------------------------*/
/*    Unexpected-Events      */
/*---------------------------*/
let checkbox = document.querySelector('.someUnexpectedEvents');
let sectionHidden = document.querySelector('.hiddenSection');
let showSection = false;

checkbox.addEventListener('click', function(){
    showSection = !showSection;
    if(showSection)
        sectionHidden.style.display = 'flex';
    else
        sectionHidden.style.display = 'none';
});






/*---------------------------*/
/*     Get-Input-Values      */
/*---------------------------*/

    /*Get pre saved data*/
    let reportInfo = localStorage.getItem('reportinfo');
    reportInfo = JSON.parse(reportInfo);

    /*Vars*/
    var workersPayment;
    var contractorName;
    var finalDate;
    var initialDate;
    var kombPayment;
    var unforeseenValue;
    var explanationValue;

    /*Get-Workers-Payment-Value*/
    let workersPayment_input = document.querySelector('.workersPayment');
    
    if(reportInfo && reportInfo['workersPayment']){
        workersPayment_input.value = reportInfo['workersPayment'];
        workersPayment = reportInfo['workersPayment'];
    }

    workersPayment_input.addEventListener('input', () => {
        workersPayment = workersPayment_input.value;
    });


    /*Get-Contractor-Name*/
    let contractorName_input = document.querySelector('.contractorName');

    contractorName_input.addEventListener('input', () => {
        contractorName = contractorName_input.value;
    });

    /*Get-Final-Date*/
    let getFinalDate_input = document.querySelector('.finalDate');

    getFinalDate_input.addEventListener('input', () => {
        finalDate = getFinalDate_input.value;
    });

    /*Get-Initial-Date*/
    let getInitialDate_input = document.querySelector('.initialDate');

    getInitialDate_input.addEventListener('input', () => {
        initialDate = getInitialDate_input.value;
    });
    
    /*Get-Komb-Payment-Value*/
    let kombPayment_input = document.querySelector('.kombPayment');

    if(reportInfo && reportInfo['kombPayment']){
        kombPayment_input.value = reportInfo['kombPayment'];
        kombPayment = reportInfo['kombPayment'];
    }

    kombPayment_input.addEventListener('input', () => {
        kombPayment = kombPayment_input.value;
    });

    /*Get-unforeseen-Value*/
    let unforeseen_input = document.querySelector('.unforeseen');

    unforeseen_input.addEventListener('input', () => {
        unforeseenValue = unforeseen_input.value;
    });

    /*Get-explanation-of-unexpected-value*/
    let explanation_input = document.querySelector('.explanation');

    explanation_input.addEventListener('input', () => {
        explanationValue = explanation_input.value;
    });



/*---------------------------------*/
/*        Add Row in Table         */
/*---------------------------------*/
let newLineButton = document.querySelector('.newLineButton');

newLineButton.addEventListener('click', () => {
    let table = document.querySelector('table');

    var novaLinha = document.createElement("tr");
    
    var celulaDay = novaLinha.insertCell(0);
    var celulaWorkers = novaLinha.insertCell(1);
    var celulaPrice = novaLinha.insertCell(2);
    

    celulaDay.setAttribute("contenteditable", true);
    celulaWorkers.setAttribute("contenteditable", true);
    celulaPrice.setAttribute("contenteditable", true);

    celulaDay.innerHTML = "dd/mm";
    celulaWorkers.innerHTML = "0";
    celulaPrice.innerHTML = "R$0,00";
    table.appendChild(novaLinha);

    setWorkersFieldToWatch();
})






/*---------------------------------*/
/*           Delete Line           */
/*---------------------------------*/
let deleteLineButton = document.querySelector('.deleteLineButton');
deleteLineButton.addEventListener('click', () => {
    
    let line = prompt('Qual linha você quer deletar?');
    
    if(line){
        let table = document.querySelector('table');

        if(line > table.rows.length || line < 0){
            alert('Número de linha invalido');
            return;
        }

        table.deleteRow(line);
    }

    setWorkersFieldToWatch();
});


/*---------------------------------*/
/*         Calculate Price         */
/*---------------------------------*/
function calculatePrice(){

    if(!workersPayment) workersPayment = 0;

    let tablePrices = document.querySelectorAll('table tr');

    for(let i = 1; i < tablePrices.length; i++){
        let priceField = tablePrices[i].querySelectorAll('td')[2];
        let workersField = tablePrices[i].querySelectorAll('td')[1].innerText;

        priceField.innerHTML = brasilianRealFormat(parseFloat(workersField) * parseFloat(workersPayment));
    }
};




/*---------------------------------*/
/*         Generate Table          */
/*---------------------------------*/
let generateButton = document.querySelector('.generateButton');

generateButton.addEventListener('click', () => {

    if(confirm('Você quer gerar o relatório agora?')){
        
        

        /*---------------GET-DATA-FOR-REPORT------------*/
            let tableData = getTableData();
            let workersPayment = document.querySelector('.workersPayment').value;
            let kombPayment = document.querySelector('.kombPayment').value;
            let unforeseenValue = document.querySelector('.unforeseen').value;
            let explanationValue = document.querySelector('.explanation').value;
            let contractorName = document.querySelector('.contractorName').value;
            let finalDate = document.querySelector('.finalDate').value;
            let initialDate = document.querySelector('.initialDate').value;

            let reportinfo = {
                workersPayment,
                kombPayment,
                unforeseenValue,
                explanationValue,
                contractorName,
                finalDate,
                initialDate
            }
        /*----------------------------------------------*/
        


        /*------------save-data-and-redirect---------------*/
        localStorage.setItem('tableData', JSON.stringify(tableData));
        localStorage.setItem('reportinfo', JSON.stringify(reportinfo));

        window.location.href = url+"/report.html";
        /*----------------------------------------------*/
        
    }

})