AFRAME.registerComponent("marker-handler",{
    init: async function(){
        var toys = await this.getAllToys();
        this.el.addEventListener("markerFound",()=>{
            var markerId = this.el.id;
            this.handleMarkerFound(toys,markerId);
        })
        this.el.addEventListener("markerLost",()=>{
            console.log("marker lost")
            this.handleMarkerLost();
        })
    },
    handleMarkerFound:function(toys,markerId){
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "flex";

        var summery_button = document.getElementById("order-summary-button");
        var order_button = document.getElementById("order-now-button");

        summery_button.addEventListener("click",()=>{
            swal({
               icon:"info",
               title:"Order Summery",
               text:"Toy Name :- Robot\nQuantity :- 1N \n Price :- $699\nType :- Working Robot\nMaterial :- Metal & Plastic\nBattery :- Chargable \n Origin :- Made In India",
               button:"Got it!"
            })
        })

        order_button.addEventListener("click",()=>{
            swal({
               icon:"https://i.imgur.com/4NZ6uLY.jpg",
               title:"Confirmation",
               text:"Are you sure, you want to order this item ?",
               buttons:true
            })
            .then((confirm)=>{
                if(confirm){
                    swal({
                        icon:"success",
                        title:"Order placed😍😍", 
                        text:"You will soon recieve your order👜👜",
                        button:"Ahh Yess!"
                    })
                }
                else{
                    swal({
                        icon:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0ICo7jOU0SxqH76t81LF5pdsC-UIOTX90Q&usqp=CAU",
                        title:"No Worry🙁🙁",
                        text:"Please look at other best items👗👠👚👓🎩"
                    })
                }
            })

        })

    var toy = toys.filter(toy => toy.id === markerId)[0];

    var model = document.querySelector(`#model-${toy.id}`);
    model.setAttribute("position", toy.model_geometry.position);
    model.setAttribute("rotation", toy.model_geometry.rotation);
    model.setAttribute("scale", toy.model_geometry.scale);
    },
    handleMarkerLost:function(){
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "none";
    },
    getAllToys:async function(){
        return await firebase
        .collection("toys")
        .get()
        .then(snap => {
            return snap.docs.map(doc => doc.data());
        })
    }
})