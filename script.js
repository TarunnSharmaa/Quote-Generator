const quotecontiner=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');


function loading(){
    loader.hidden=false;
    quotecontiner.hidden=true;
}

function complete(){
    if(!loader.hidden){
        quotecontiner.hidden=false;
        loader.hidden=true;
    }
}

//get quote from api

async function getQuote(){
    loading();
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/';
    const apiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response=await fetch(proxyUrl + apiUrl);
        const data= await response.json();
        if(data.quoteAuthor===''){
            authorText.innerText="Unknown";
        }else{
            authorText.innerText=data.quoteAuthor;
        }

        if(data.quoteText.lenght>150){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText=data.quoteText;

        complete();

    }catch(error){
        getQuote(); 
        console.log('whooops!! no quote ', error);
    }
}

 function tweetQuote(){
     const quote=quoteText.innerText;
     const author=authorText.innerText;
     const twitterUrl=`https://twitter.com/intent/tweet?text=${quote}-${author}`;
     window.open(twitterUrl,'_blank');
 }
 
//event listener

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click',tweetQuote);




//on load
getQuote();
