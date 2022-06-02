async function update(year){
    let jsonData
    jsonData = await fetch(`./data/20${year}.json`)
    await jsonData.json() 
        .then(response => {
            jsonData = response
            //TODO Clear previous modals :p
            let wrapper = document.getElementsByClassName("achievements-wrapper")[0]
            let body = document.body
            let achievementPanels = ""
            for (let key in jsonData) {
                var position = jsonData[key]["Position(s)"][0]
                var color
                if(position == "1"){
                    color = "#FDDD6D"
                }else if(position == "2"){
                    color = "#CCCCCC"
                }else{
                    color = "#FD8F6D"
                }
                achievementPanels += `<div data-micromodal-trigger="modal-${parseInt(key)+1}" class="achievements-slide swiper-slide">
                                        <div class="achievelist-position" style="background-color:${color}">#${position}</div>
                                        <div class="achievelist-title">${jsonData[key]["Event"]}</div>
                                        <div class="achievelist-org">${jsonData[key]["Host"]}</div>
                                    </div>`
                var modal = document.getElementById(`modal-${parseInt(key)+1}`)
                if(modal == null){
                    modal = document.createElement("div")
                    modal.classList.add("modal")
                    modal.classList.add("micromodal-slide")
                    modal.id = `modal-${parseInt(key)+1}`
                    modal.ariaHidden = "true"
                }
                modal.innerHTML = `<div class="modal__overlay" tabindex="-1" data-micromodal-close>
                                    <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
                                    
                            
                                    <div class="modal-row modal-row-close">
                                        <button class="modal__close" aria-label="Close modal" data-micromodal-close>close</button>
                                    </div>
                            
                                    <div class="modal-row modal-row-title" style="background-color:${color}">
                                        <div class="modal-title-position">#${position}</div>
                                        <div class="modal-title-quiz">${jsonData[key]["Event"]}</div>
                                    </div>
                                    <div class="modal-row modal-row-details">
                                        <div class="modal-details-host">${jsonData[key]["Host"]}</div>
                                        <div class="modal-details-date">${jsonData[key]["Start Date"]}</div>
                                    </div>
                                    <div class="modal-row modal-row-members">
                                       
                                    </div> 
                                    <div class="modal-row modal-row-done">
                                        <button class="modal__btn" data-micromodal-close aria-label="Close this dialog window">Done</button>
                                    </div>
                                    </div>
                                </div>`
                var members = modal.getElementsByClassName("modal-row-members")[0]
                var mhtml = ""
                for(let mkey = 1; mkey<= 4; mkey +=1){
                    var mname = jsonData[key][`Participant ${mkey}`]
                    if (mname == ""){
                        break;
                    }
                    mhtml += ` <button class="modal-row-members-${mkey}">
                                <div class="modal-row-members-image"></div>
                                <div class="modal-row-members-name">${mname}</div>
                            </button>`

                }
                members.innerHTML = mhtml
                body.appendChild(modal)
            }
            wrapper.innerHTML = achievementPanels
            
            MicroModal.init({
                awaitCloseAnimation: true,// set to false, to remove close animation
                onShow: function (modal) {
                  console.log("micromodal open");
                },
                onClose: function (modal) {
                  console.log("micromodal close");
                }
              });
            
        })
}
