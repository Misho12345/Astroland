let shopButtons = [
    document.getElementById("buildings-button"),
    document.getElementById("weapons-button"),
    document.getElementById("utilities-button")
];

let currentShopMode = 0;

function EQUIP_Btn_onmouseover(button) { button.style.backgroundColor = "#EE4622" }
function EQUIP_Btn_onmouseout(button) { button.style.backgroundColor = "#FF5733" }

function changeShopItems(mode) {
    shopButtons[currentShopMode].classList.add("shop-button-not-selected");
    shopButtons[currentShopMode].classList.remove("shop-button-selected");

    shopButtons[mode].classList.add("shop-button-selected");
    shopButtons[mode].classList.remove("shop-button-not-selected");

    items.innerHTML = "";

    switch (mode) {
        case 0:
            for (let i = 0; i < buildingsTypes.length; i++) {
                items.innerHTML +=
                    "<div class='item'>\
                        <div class='left-part'>\
                            <div class='item-image' style='background-image: " + buildingsTypes[i].url + ";'></div>\
                            <div class='item-name'>" + buildingsTypes[i].name + "</div>\
                        </div>\
                        <div class='item-properties'>\
                            " + (buildingsTypes[i].hp ? "<div class='item-property'><abbr title='Health points'>HP</abbr>: <span class='item-property-value'>" + buildingsTypes[i].hp + "</span></div>" : "") + "\
                            " + (buildingsTypes[i].cps ? "<div class='item-property'><abbr title='Coins per second'>CPS</abbr>: <span class='item-property-value'>" + buildingsTypes[i].cps + "</span></div>" : "") + "\
                            " + (buildingsTypes[i].hp || buildingsTypes[i].cps  ? "<br><br>" : "") + "\
                            <div class='item-tip' >" + buildingsTypes[i].tip + "</div>\
                        </div>\
                        <div class='right-part'>\
                            <div class='item-price'>" + buildingsTypes[i].price + "</div>\
                            <div class='item-buy-button' onclick='requestPurchasingABuilding(" + i + ")'>BUY</div>\
                        </div>\
                    </div>";
            }

            break;

        case 1:
            for (let i = 0; i < weapons.length; i++) {
                items.innerHTML +=
                    "<div class='item'>\
                    <div class='left-part'>\
                        <div class='item-image' style='background-image: " + weapons[i].url + ";'></div>\
                        <div class='item-name'>" + weapons[i].name + "</div>\
                    </div>\
                    <div class='item-properties'>\
                        <div class='item-property'>damage: <span class='item-property-value'>" + weapons[i].dmg + "</span> </div>\
                        <div class='item-property'><abbr title='Revolutions per minute (firing speed)'>RPM</abbr>: <span class='item-property-value'>" + Math.round(100 / weapons[i].fireSpeed * 6000) / 100 + "</span></div>\
                        <div class='item-property'><abbr title='Damage per second'>DPS</abbr>: <span class='item-property-value'>" + weapons[i].dps + "</span></div>\
                        <div class='item-property'>accuracy: <span class='item-property-value'>" + (100 - 5 * weapons[i].inaccuracy) + "</span></div>\
                    " + (weapons[i].bulletCount > 1 ? "<div class='item-property'>bullets: <span class='item-property-value'>" + weapons[i].bulletCount + "</span></div>" : "")
                    + "</div>\
                    <div class='right-part'>" +
                    (weapons[i].price != 0 ?
                        "<div class='item-price' > " + weapons[i].price + "</div >\
                        <div id='" + weapons[i].name + "_button' class='item-buy-button' onclick='requestPurchasingAWeapon(" + i + ")'>BUY</div>"
                        :
                        (player && player.weaponIdx == i ?
                            "<div id='" + weapons[i].name + "_button' class='item-buy-button' style='margin: auto; background-color: gray; border-color: darkgray;'>EQUIPPED</div>\ " :
                            "<div id='" + weapons[i].name + "_button' class='item-buy-button' style='margin: auto; background-color: #FF5733; border-color: red' onmouseover='EQUIP_Btn_onmouseover(this)' onmouseout='EQUIP_Btn_onmouseout(this)' onclick='equipWeapon(" + i + ")'>EQUIP</div>\ ")) +
                    "</div>\
                </div>";
            }

            break;

        case 2:
            for (let i = 0; i < utilities.length; i++) {
                items.innerHTML +=
                "<div class='item'>\
                    <div class='left-part'>\
                        <div class='item-image' style='background-image: " + utilities[i].url + ";'></div>\
                        <div class='item-name'>" + utilities[i].name + "</div>\
                    </div>\
                    <div class='item-properties'>\
                        <div class='item-property' >" + utilities[i].property + "</div>\
                        <div class='item-tip' >" + utilities[i].tip + "</div>\
                    </div>\
                    <div class='right-part'>\
                        <div class='item-price' > " + utilities[i].price + "</div >\
                        <div class='item-buy-button' onclick='requestPurchasingUtilities(" + i + ")'>BUY</div>\
                    </div>\
                </div>";
            }

            break;
    }
    
    if (mode != currentShopMode) {
        items.scrollTop = 0;
        currentShopMode = mode;
    }
}