fetch('https://line-item.myshopify.com/products/shoes.json').then(function (response) {
if (response.ok) {
            return response.json();
    }
    return Promise.reject(response);
}).then(function (data) {
    showProduct(data);
}).catch(function (error) {
    console.warn('Something went wrong.', error);
});

let products;
function showProduct(productData){
    products = productData;
    var variantImages = products.product.images;
    let arr_getvaues = {};
    let varinatId = [];
    let commonImages= [];
    variantImages.forEach(imageValus);
    function imageValus(value) {
        if(value.variant_ids > 0){
            varinatId = value['variant_ids'];
        }

        if(varinatId.length == 0 ){
            commonImages.push(value.src)
        }

        varinatId.forEach((id)=>{
           if(typeof arr_getvaues[id] == "undefined"){
                arr_getvaues[id] = [value.src];
            }
            else{
                arr_getvaues[id].push(value.src);
            }
        })

        
    }
    var option = Object.keys(arr_getvaues)
    var select = document.querySelector('#shoesOptions');
    option.forEach(addOption);
    function addOption(ids){
        var optionTag = document.createElement('option');
        optionTag.setAttribute('value',ids)
        optionTag.innerHTML = ids;
        select.appendChild(optionTag);
        document.querySelector('#shoesOptions').dispatchEvent(new Event("change"));
        select.addEventListener('change',getImageSrc);
    }
    function getImageSrc(){
        selectedKey = select.value; 
        var showImage = arr_getvaues[selectedKey];
        var selectImage = document.getElementById('gallery_images');

        selectImage.querySelectorAll('.gallery_img').forEach(div=>{
            div.remove()
        })
        showImage.forEach(imageSrc);

        function imageSrc(src){
            var image_container = document.createElement('div');
            image_container.className = ('col-12 col-sm-4 col-md-2 mt-4 gallery_img');
            var imgTag = document.createElement('img');
            imgTag.className = ('img-fluid img-thumbnail max-height350 d-block mx-auto');
            imgTag.setAttribute("src", src); 
            image_container.appendChild(imgTag);
            selectImage.append(image_container);
        }
        
    }
    
}