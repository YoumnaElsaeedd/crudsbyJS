let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let  total= document.getElementById('total')
let  count= document.getElementById('count')
let  category= document.getElementById('category')
let  submit= document.getElementById('submit')
let  search= document.getElementById('search')
let  byTitle= document.getElementById('byTitle')
let  byCategory= document.getElementById('byCategory')
let  tbody= document.getElementById('tbody')
let  btnAll= document.getElementById('deletAll')

let mood ='create'
let x;

 function getTotal () {
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value
        total.innerHTML=result
        total.style.background="green"
    }else {
        total.innerHTML=''
        total.style.background= "red"
    }}

    let newProdArr;
    if(localStorage.product != null){
        newProdArr = JSON.parse(localStorage.product)
    }else{
        newProdArr=[]
    }


    submit.onclick = function(){   
     let newProduct = {
            title:title.value,
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value,
        }
        if(mood==='create'){
        if(newProduct.count>1){
            for(let i=0; i<newProduct.count;  i++){
                newProdArr.push(newProduct)
            }
        }else{
                newProdArr.push(newProduct)
            }
        }else{
            newProdArr[x]=newProduct
            mood='create'
            submit.innerHTML='create'
            count.style.display='block'


        }
    localStorage.setItem('product', JSON.stringify(newProdArr))   
       clearData ()
       showData()
    }

    function clearData (){
       title.value =''
        price.value=''
        taxes.value=''
        ads.value=''
        discount.value=''
        total.innerHTML=''
        count.value=''
        category.value=''
    }

    function deleteAllFun(){
        localStorage.clear()
        newProdArr.splice(0,newProdArr.length)
        btnAll.innerHTML = '';
         showData()
   }

    function showData(){ 
        getTotal()
        tbody.innerHTML = ''
        let a = JSON.parse(localStorage.getItem('product'));
        a.forEach((element,index) => {
            tbody.innerHTML+=`
             <tr>
                <td>${index+1}</td>
                <td>${element.title}</td>
                <td>${element.price}</td>
                <td>${element.taxes}</td>
                <td>${element.ads}</td>
                <td>${element.discount}</td>
                <td>${element.total}</td>
                <td>${element.category}</td>
                <td><button onclick="updateFun(${index})"  id="update">update</button></td>
                <td><button onclick="deleteFun(${index})" id="delete">delete</button></td>
            </tr> ` 
        });
        if (newProdArr.length>0){
            btnAll.innerHTML=`<button onclick="deleteAllFun()">Delete All</button>`
        }
        else{
            btnAll.innerHTML=' '
        }
    }
    showData()

    function deleteFun(index) {
        newProdArr.splice(index, 1);
        localStorage.setItem('product', JSON.stringify(newProdArr));
        showData();
    }

    function updateFun(index){
        getTotal()
        title.value =newProdArr[index].title
        price.value=newProdArr[index].price
        taxes.value=newProdArr[index].taxes
        ads.value=newProdArr[index].ads
        discount.value=newProdArr[index].discount
        total.innerHTML=newProdArr[index].total
        category.value=newProdArr[index].category
        count.style.display='none'
        submit.innerHTML='Update'
        mood='update'
        x=index
        scroll({
            top:0,
            behavior:"smooth"
        })
        getTotal()
    }

    let searchMood = 'title';

    function getSearchMood(id) {
        if (id === 'byTitle') {
            searchMood = 'title';
        } else {
            searchMood = 'category';
        }
        search.placeholder = 'search by ' + searchMood;
        search.focus();
        search.value=''
        showData()
    }
    
    function searchItems(value) {
        if(value==''){
            showData()
        }
        tbody.innerHTML = ''; 
    
        let products = JSON.parse(localStorage.getItem('product')); 
        products.forEach((element, index) => {
           
            if (searchMood === 'title' && element.title.toLowerCase().includes(value.toLowerCase())) {
                tbody.innerHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${element.title}</td>
                        <td>${element.price}</td>
                        <td>${element.taxes}</td>
                        <td>${element.ads}</td>
                        <td>${element.discount}</td>
                        <td>${element.total}</td>
                        <td>${element.category}</td>
                        <td><button onclick="updateFun(${index})" id="update">update</button></td>
                        <td><button onclick="deleteFun(${index})" id="delete">delete</button></td>
                    </tr>
                `;
            } else if (searchMood === 'category' && element.category.toLowerCase().includes(value.toLowerCase())) {
                tbody.innerHTML += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${element.title}</td>
                        <td>${element.price}</td>
                        <td>${element.taxes}</td>
                        <td>${element.ads}</td>
                        <td>${element.discount}</td>
                        <td>${element.total}</td>
                        <td>${element.category}</td>
                        <td><button onclick="updateFun(${index})" id="update">update</button></td>
                        <td><button onclick="deleteFun(${index})" id="delete">delete</button></td>
                    </tr>
                `;
            }
        });
      
    }
    

    




    





































