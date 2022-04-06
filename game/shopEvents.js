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
                    <div></div>\
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

        weapons.forEach(weapon => {
            items.innerHTML +=
                "<div class='item'>\
                    <div class='left-part'>\
                        <div class='item-image' style='background-image: " + weapon.url + ";'></div>\
                        <div class='item-name'>" + weapon.name + "</div>\
                    </div>\
                    <div class='item-properties'>\
                        <div class='item-property'>damage: <span class='item-property-value'>" + weapon.dmg + "</span> </div>\
                        <div class='item-property'>firing speed: <span class='item-property-value'>" + Math.round(100 / weapon.fireSpeed * 100) / 100 + "</span></div>\
                        <div class='item-property'><abbr title='Damage per second'>DPS</abbr>: <span class='item-property-value'>" + weapon.dps + "</span></div>\
                    " + (weapon.bullets > 1 ? "<div class='item-property'>bullet count: <span class='item-property-value'>" + weapon.bullets + "</span></div>" : "")
                 + "</div>\
                    <div class='right-part'>\
                        <div class='item-price'>" + weapon.price + "</div>\
                        <div class='item-buy-button'>BUY</div>\
                    </div>\
                    <div></div>\
                </div>";
        });
    }
}

changeShopItems(1);