const loadPhone=async(searchText=12,isShowAll)=>{
const res=await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
const data=await res.json();
const phones=data.data;
// console.log(phones);
displayPhones(phones,isShowAll);
}
const displayPhones=(phones,isShowAll)=>{
    const phoneContainer=document.getElementById('phone-container');

    // display show all button more than 12 phone============>
    const showAllContainer=document.getElementById('show-all-container')
    if(phones.length>12 && !isShowAll){
      showAllContainer.classList.remove('hidden')
    }
    else {
      showAllContainer.classList.add('hidden')
    }
    // console.log('is show all',isShowAll)
// slince  display only first 12 if not show all ===============>
if(!isShowAll){
  phones=phones.slice(0,12);
}

// defult search
phoneContainer.innerHTML="";

//=======================> create a div==================>
phones.forEach(phone => {
  // console.log(phone);
    
    const PhoneCard =document.createElement('div')
    PhoneCard.classList=`card justify-center p-4 text-center bg-gray-100 shadow-xl ju`;
    PhoneCard.innerHTML=`
    <figure><img src='${phone.image}' alt="Shoes" /></figure>
    <div class="card-body text-center">
          <h2 class="card-title justify-center text-center">${phone.phone_name}</h2>
          <p>if buy phone all we can use everythin </p>
          <div class="card-actions justify-center">
            <button class="btn btn-primary btn" onclick="handleShowDeatils('${phone.slug}');show_modal_deatils.showModal()">show Deatils </button>
          </div>
        </div>

    
    `;
    // 4 append child
   phoneContainer.appendChild(PhoneCard);
    
});

// hide loding spinner======================>
toggleLoadingSpinner(false);
}




// show modal  deatis btn====================>
const handleShowDeatils=async(id)=>{
  // console.log('show',id);
  // load data indevisual
  const res=await fetch(` https://openapi.programming-hero.com/api/phone/${id}`);
  const data=await res.json();
  // console.log(data);
const phone=data.data;
  showPhoneDetails(phone)
}


const showPhoneDetails=(phone)=>{
   console.log(phone);

  const phoneName=document.getElementById('show-phone-deatils');
  phoneName.innerText=phone.name;
  const showDeatilsContainer=document.getElementById('show-deatils-container');
  showDeatilsContainer.innerHTML=`
  <img src="${phone.image}" class=" justify-center items-center text-center w-full " alt=""/>
  <p> <span>storage:</span> ${phone?.mainFeatures?.storage}</p>
  <p> <span>cheapset:</span> ${phone?.mainFeatures?.chipSet}</p>
  <p> <span>Display-size:</span> ${phone?.mainFeatures?.displaySize}</p>
  <p> <span>GPS:</span> ${phone?.others?.GPS ||'No gps abaible'}</p>
  <p> <span>USB:</span> ${phone?.others?.USB}</p>
  <p> <span>WLAN:</span> ${phone?.others?.WLAN}</p>
  


  `


  // show modal
  show_modal_deatils.showModal()
}
// ===============>search 1
const handleSearch=(isShowAll)=>{
 const searchField=document.getElementById('searc-field2');
 const searchText=searchField.value;
//  console.log(searchText);
loadPhone(searchText,isShowAll);
};
// another search recap=========>
const  handleSearch2=()=>{
  toggleLoadingSpinner(true);
 const searchField= document.getElementById('searc-field2');
  const searchText=searchField.value;
  loadPhone(searchText);

}
// ==============>loading spanner 
const toggleLoadingSpinner=(isLoading)=>{
  const loaddingSpnner=document.getElementById('loading-spinner')
if(isLoading){
  loaddingSpnner.classList.remove('hidden')
}
else{
  loaddingSpnner.classList.add('hidden')
}

}
// showall btn==========>
const handleShowAll=()=>{
handleSearch(true);

}
loadPhone();