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
                        " + (building.hp ? "<div class='item-property'> - " + building.hp + " hp</div>" : "") + "\
                        " + (building.cps ? "<div class='item-property'> - " + building.cps + " <abbr title='Coins per second'>CPS</abbr></div>" : "") + "\
                        <br><br>\
                        <div class='item-tip' > - " + building.tip + "</div>\
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

        weapons.forEach(weapon => {
            items.innerHTML +=
                "<div class='item'>\
                    <div class='left-part'>\
                        <div class='item-image' style='background-image: " + weapon.url + ";'></div>\
                        <div class='item-name'>" + weapon.name + "</div>\
                    </div>\
                    <div class='item-properties'>\
                        <div class='item-property' > - " + weapon.dmg + " damag</div>\
                        <div class='item-property' > - " + weapon.speed + " speed</div>\
                        <div class='item-property' > - " + weapon.dps + " <abbr title='Damage per second'>DPS</abbr></div>\
                        <div class='item-property' > - " + weapon.bullets + " bullets</div>\
                    </div>\
                    <div class='right-part'>\
                        <div class='item-price'>" + weapon.price + "</div>\
                        <div class='item-buy-button'>BUY</div>\
                    </div>\
                </div>";
        });
    }
}

changeShopItems(1);