let handleBuildingsButtonMouseover = () => buildingsButton.style.backgroundColor = "var(--not-checked-hover-background-color)";
let handleBuildingsButtonMouseout = () => buildingsButton.style.backgroundColor = "var(--not-checked-background-color)";

let handleWeaponsButtonMouseover = () => weaponsButton.style.backgroundColor = "var(--not-checked-hover-background-color)";
let handleWeaponsButtonMouseout = () => weaponsButton.style.backgroundColor = "var(--not-checked-background-color)";

function EQUIP_Btn_onmouseover(button) {
    button.style.backgroundColor = "#EE4622";
}

function EQUIP_Btn_onmouseout(button) {
    button.style.backgroundColor = "#FF5733";
}

function changeShopItems(mode) {
    if (mode) {
        buildingsButton.style.backgroundColor = "var(--checked-background-color)";
        weaponsButton.style.backgroundColor = "var(--not-checked-background-color)";

        buildingsButton.removeEventListener("mouseover", handleBuildingsButtonMouseover);
        buildingsButton.removeEventListener("mouseout", handleBuildingsButtonMouseout);

        weaponsButton.addEventListener("mouseover", handleWeaponsButtonMouseover);
        weaponsButton.addEventListener("mouseout", handleWeaponsButtonMouseout);

        items.innerHTML = "";

        buildingsTypes.forEach(building => {
            items.innerHTML +=
                "<div class='item'>\
                    <div class='left-part'>\
                        <div class='item-image' style='background-image: " + building.url + ";'></div>\
                        <div class='item-name'>" + building.name + "</div>\
                    </div>\
                    <div class='item-properties'>\
                        " + (building.hp ? "<div class='item-property'><abbr title='Health points'>HP</abbr>: <span class='item-property-value'>" + building.hp + "</span></div>" : "") + "\
                        " + (building.cps ? "<div class='item-property'><abbr title='Coins per second'>CPS</abbr>: <span class='item-property-value'>" + building.cps + "</span></div>" : "") + "\
                        " + (building.hp || building.cps  ? "<br><br>" : "") + "\
                        <div class='item-tip' >" + building.tip + "</div>\
                    </div>\
                    <div class='right-part'>\
                        <div class='item-price'>" + building.price + "</div>\
                        <div class='item-buy-button'>BUY</div>\
                    </div>\
                </div>";
        });
    } else {
        weaponsButton.style.backgroundColor = "var(--checked-background-color)";
        buildingsButton.style.backgroundColor = "var(--not-checked-background-color)";

        weaponsButton.removeEventListener("mouseover", handleWeaponsButtonMouseover);
        weaponsButton.removeEventListener("mouseout", handleWeaponsButtonMouseout);

        buildingsButton.addEventListener("mouseover", handleBuildingsButtonMouseover);
        buildingsButton.addEventListener("mouseout", handleBuildingsButtonMouseout);

        items.innerHTML = "";

        for (let i = 0; i < weapons.length; i++) {
            items.innerHTML +=
                "<div class='item'>\
                    <div class='left-part'>\
                        <div class='item-image' style='background-image: " + weapons[i].url + ";'></div>\
                        <div class='item-name'>" + weapons[i].name + "</div>\
                    </div>\
                    <div class='item-properties'>\
                        <div class='item-property'>damage: <span class='item-property-value'>" + weapons[i].dmg + "</span> </div>\
                        <div class='item-property'>firing speed: <span class='item-property-value'>" + Math.round(100 / weapons[i].fireSpeed * 100) / 100 + "</span></div>\
                        <div class='item-property'><abbr title='Damage per second'>DPS</abbr>: <span class='item-property-value'>" + weapons[i].dps + "</span></div>\
                    " + (weapons[i].bullets > 1 ? "<div class='item-property'>bullet count: <span class='item-property-value'>" + weapons[i].bullets + "</span></div>" : "")
                 + "</div>\
                    <div class='right-part'>" +
                        (weapons[i].price != 0 ?
                        "<div class='item-price' > " + weapons[i].price + "</div >\
                        <div id='" + weapons[i].name + "_button' class='item-buy-button' onclick='requestPurchasingAWeapon(" + i + ")'>BUY</div>"
                        :
                        (player.weaponIdx == i ?
                        "<div id='" + weapons[i].name + "_button' class='item-buy-button' style='margin: auto; background-color: gray; border-color: darkgray;'>EQUIPPED</div>\ " :
                    "<div id='" + weapons[i].name + "_button' class='item-buy-button' style='margin: auto; background-color: #FF5733; border-color: red' onmouseover='EQUIP_Btn_onmouseover(this)' onmouseout='EQUIP_Btn_onmouseout(this)'>EQUIP</div>\ ")) +
                    "</div>\
                </div>";
        }
    }
}

changeShopItems(1);