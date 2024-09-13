import { RadixDappToolkit, DataRequestBuilder, RadixNetwork } from '@radixdlt/radix-dapp-toolkit'
import * as d3 from 'd3';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


// You can create a dApp definition in the dev console at https://stokenet-console.radixdlt.com/dapp-metadata 
// then use that account for your dAppId

const dAppId = 'account_tdx_2_12yjctk8r4csusav9c7z9a7j9vahmnnhnht5ym2ffngh9rqyajsgsdd'
let stabIdAddress = "resource_tdx_2_1ngnptx4ly75dwcv2knf6cp957qfjjprsz90kc8qmqh4ttamj4a2as3" //still need
let componentAddress = "component_tdx_2_1cq9z3rpmt2vruwkqault43q640pshekt32tndn0dzkfrrwujhlhfgr"
let stabComponentAddress = "component_tdx_2_1czdep00tnsy9js8atnc6u3v472nxgjmk5j6prtzfw56ttz9fdk9a8n"
let poolComponentAddress = "component_tdx_2_1cqugvczcd8fpy84t3dn6rp799k37akrfzedarwxmdhfs5azhkyzefl"
let poolAddress = "pool_tdx_2_1ckcazvgthuenzzgmg57ypu5np60n4z53gcfwgj97dzzzwk080zvyj7"
let stabAddress = "resource_tdx_2_1t5tj80eezjkzeetr6y949u0zncef802n3nj89ufa9qudfuup48vfta"
let cdpAddress = "resource_tdx_2_1n2w8fs9w8h2my3gk4ew9md27lsk9zqwfu3glh0gu2a9vfqza6v5f5f"
let ctrlBadgeAddress = "resource_tdx_2_1t5nf9gq7gv4xu454dt7f2h8xvklq7kh4nastnvs3cheq9zjn3xm8lv"
let xrdAddress = "resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc"
let ilisAddress = "resource_tdx_2_1t4tsw7n2d0yfs27myw7x5khx00an2lwnvdsj9tyhkv3l8xvgn7mxdc" //still need
let lpAddress = "resource_tdx_2_1th4dw07e73vrshnxpfjld740499unfdwwsdwqayp8n4qdm57ckc8h2"
let liqAddress = "resource_tdx_2_1ntxtn0eemtwj0n5d2yjga4xtx7q3m8mspawt2c3j0t8dnypjtygv7n"
let markerAddress = "resource_tdx_2_1n2yuvhnnl3sp8wmysvue3xfenh32zz23y45472m82vrzpps09y8pwg"
let stakingAddress = "component_tdx_2_1cp3k6zm5xqgx0wcf0qtcndjzlxvpusdfpm4eq4838wuswn5h66j8px" // still need
let accountAddress = "account_tdx_2_129kt8327ulqyq0ahdh74plu0r23qn9jugxppehggtp27m9n063heec"
let stakesKvs = "internal_keyvaluestore_tdx_2_1kzphr34g06wgtygn5eppvtavyt4qptp4xn9y0uzwgdesh324zrl7yu" // still need
let collateralsKvs = "internal_keyvaluestore_tdx_2_1kp7gpwzhudc5xe96999ndnxyymzpcadwu78uanug2ses7wjq8qrmpf"
let xrdKeyHex = "5c805da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c6"
let kvsHexes = ["5c805d78ab93fb11d006a1df76c2f432fc9e7db5f1c5d3931900a25ac8298ce3", "5c805d57077a6a6bc8982bdb23bc6a5ae67bfb357dd3636122ac97b323f39988"]
const acceptedResources = [["XRD", "resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc", "", "images/radix-logo.svg", 1, 'XRD', 0],
["Hermes LSU", "resource_tdx_2_1th9k30slgu9uekfu42llstgcq80dx8d59hxgexe5hdaqzyp8etc2dv", "validator_tdx_2_1s0l6946a2kx33vjmuuh3qrax3ueauznd2fc3d69md2exx29rcnjmnj", "https://hermesprotocol.io/assets/images/icon.svg", 1, 'LSU', 0],
["Radst0kes LSU", "resource_tdx_2_1thutwwmqwk6z4vyju8v0fhdlxdhgj2h7kgc8822cfsdeyjp7e5j3hd", "validator_tdx_2_1sdvnyupyl2atq72f5lsq7lcyw3cc4vnevf05yvtemn5c8fyncvv3xw", "images/radstokes-logo.png", 1, 'LSU', 0]]
let selectedText;
let xrdPrice;
let interestRate;
let stab_ids = [];
let cdp_ids = [];
let marker_ids = [];
let cdpIds;
let cdpWaitingAmount;
let cdpWaitingIds;
let lpAmountId;
let lpWaitingAmount;
let ilisAmountId;
let ilisWaitingAmount;
let nextClaim;
let currentPeriod;
let stabXrdRatio;
let internalPrice;
let validatorMultiplier;
let walletIlis;
let walletXrd;
let walletLp;
let walletStab;
let balance;
let formattedWallet;
let formattedRemoveLp;
let formattedProvideStab;
let xrdPoolAmount;
let stabPoolAmount;
let fee = 0.001;
let sell = true;
let idSupplied = false;
let stakeRewards;
let lpRewards;
let status;
let resourceAddress;
let debtAmount;
let parentAddress;
let collateralAmount;
let cr;
let markedId;
let markedTime;
let markerUsed;
let markerDate;
let selectedCollateral;
let availableCollateral;
let selectedCdp;
let selectedId;
let selectedMarker;
let weekAgoXrdPrice;
let weekAgoStabPrice;
let weekAgoLpPrice;
let mintAmount;
let markerUsable = false;
let upToDateCr;
let maxCr;
let maxCrDebt;
let newCrDebt;
let bigData;
let addingCollateral = true;
let newCr;
let liqNextStab;
let liqRewardAddress;
let bigFail;
let addingDebt = false;
let realInputDebt;
let realInputCol;
let cantLiqWithSkips;

let resourceAddresses = []
let validatorAddresses = []

var inputs = document.querySelectorAll('.decimal-only');

window.onload = function () {
    var inputs = document.getElementsByTagName('input');

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener('focus', function () {
            if (this.value === '0') {
                this.value = '';
            }
        });

        inputs[i].addEventListener('blur', function () {
            if (this.value === '') {
                this.value = '0';
            }
        });

        inputs[i].addEventListener('dragover', function (event) {
            event.preventDefault();
        });

        inputs[i].addEventListener('drop', function (event) {
            event.preventDefault();
        });
    }

    positionElement();
}

window.onresize = function () {
    positionElement();
}

function positionElement() {
    var placeholder = document.getElementById('placeholder');
    var buggedElement = document.getElementById('buggedElement');

    var rect = placeholder.getBoundingClientRect();

    var width = window.innerWidth;

    if (width > 980) {
        buggedElement.style.position = 'fixed';
        buggedElement.style.top = rect.top - 10 + 'px';
        buggedElement.style.left = rect.left - 129 + 'px';
    } else {
        buggedElement.style.position = 'fixed';
        buggedElement.style.top = rect.top - 10 + 'px';
        buggedElement.style.left = rect.left - 36 + 'px';
    }


    /*buggedElement.style.position = 'fixed';
    buggedElement.style.top = '0px';
    buggedElement.style.left = '0px';*/
}

inputs.forEach(function (input) {
    input.addEventListener('input', function (evt) {
        var value = this.value;
        var decimalPos = value.indexOf('.');
        if (isNaN(value) || (decimalPos != -1 && value.split('.')[1].length > 18)) {
            this.value = value.substring(0, value.length - 1);
        }
    });
});

document.getElementById('hamburger').addEventListener('click', function () {
    var navLinksHamburger = document.getElementById('navLinks-hamburger');
    if (navLinksHamburger.style.display === 'none') {
        navLinksHamburger.style.display = 'flex';
    } else {
        navLinksHamburger.style.display = 'none';
    }
});

/*window.addEventListener('resize', function () {
    var navLinksHamburger = document.getElementById('navLinks-hamburger');
    if (window.innerWidth > 820) {
        navLinksHamburger.style.display = 'none';
    }
});*/

function updateSliderBackground(slider) {
    const value = slider.value;
    // Calculate the percentage of the thumb position
    const percentage = (value - slider.min) / (slider.max - slider.min) * 100;
    // Update the slider background style
    slider.style.background = `linear-gradient(to right, #1BA9A0 0%, #2B6CCC ${percentage}%, #f2f2f2 ${percentage}%)`;
}

function toastMe(txId, action, kind) {
    if (kind === 1) {
        Toastify({
            text: `${action} submitted successfully!`,
            duration: 5000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(90deg, rgba(65,58,179,1) 0%, rgba(90,90,172,1) 41%, rgba(118,133,180,1) 100%)",
            },
            onClick: function () { } // Callback after click
        }).showToast();
    } else if (kind === 2) {
        Toastify({
            text: `${action} successful! Click for more info.`,
            duration: 5000,
            destination: `https://stokenet-dashboard.radixdlt.com/transaction/${txId}`,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(90deg, rgba(86,130,80,1) 0%, rgba(94,172,90,1) 41%, rgba(124,180,118,1) 100%)",
            },
            onClick: function () { } // Callback after click
        }).showToast();
    } else if (kind === 3) {
        Toastify({
            text: "Transaction failed.",
            duration: 5000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(90deg, rgba(152,67,67,1) 0%, rgba(177,72,72,1) 41%, rgba(227,90,90,1) 100%)",
            },
            onClick: function () { } // Callback after click
        }).showToast();
    }

}

function getUpToDateCr(currentCollateralAmount, currentDebtAmount, validatorMultiplier) {
    return (xrdPrice * (currentCollateralAmount / currentDebtAmount)) / (validatorMultiplier * internalPrice);
}

function getNecessaryCollateral(debtAmount, cr, validatorMultiplier) {
    return (debtAmount * internalPrice * cr * validatorMultiplier) / (xrdPrice);
}

function getNecessaryStab(collateralAmount, cr, validatorMultiplier) {
    return (collateralAmount * xrdPrice) / (cr * internalPrice * validatorMultiplier);
}

function setChevron(customContent) {
    var dropdownCustom = customContent.parentElement;
    var customButton = dropdownCustom.querySelector('.dropdown-custom-button');
    var chevronDown = customButton.querySelector('.chevron-down');
    var chevronUp = customButton.querySelector('.chevron-up');

    if (customContent.style.display === 'none') {
        chevronDown.style.display = 'block';
        chevronUp.style.display = 'none';
    } else {
        chevronDown.style.display = 'none';
        chevronUp.style.display = 'block';
    }
}

function setChevronNoButton(customContent) {
    var customButton = customContent;
    var chevronDown = customButton.querySelector('.chevron-down');
    var chevronUp = customButton.querySelector('.chevron-up');
    var text = customButton.querySelector('.info-text');

    if (text.style.display === 'none') {
        chevronDown.style.display = 'none';
        chevronUp.style.display = 'block';
        text.style.display = 'block';
    } else {
        chevronDown.style.display = 'block';
        chevronUp.style.display = 'none';
        text.style.display = 'none';
    }
}

function setSwapButton() {
    var swapButton = document.getElementById('sell');
    var enable = true;
    if (isConnected == false) {
        enable = false;
    } else if (sell == true && parseFloat(document.getElementById('amount-sell').value) > walletXrd) {
        enable = false;
    } else if (sell == false && parseFloat(document.getElementById('amount-sell').value) > walletStab) {
        enable = false;
    } else if (document.getElementById('amount-sell').value == '') {
        enable = false;
    } else if (parseFloat(document.getElementById('amount-sell').value) == 0) {
        enable = false;
    }

    if (enable) {
        document.getElementById('swap-warning').style.display = 'none';
        swapButton.style.backgroundColor = "";
        swapButton.disabled = false;
    } else {
        swapButton.style.backgroundColor = "hsl(0, 0%, 0%)";
        swapButton.disabled = true;
    }
}

function setProvideButton() {
    var provideButton = document.getElementById('provide');
    var enable = true;
    if (isConnected == false) {
        enable = false;
    } else if (parseFloat(document.getElementById('amount-stab-provide-lp').value) > walletStab) {
        enable = false;
    } else if (parseFloat(document.getElementById('amount-xrd-provide-lp').value) > walletXrd) {
        enable = false;
    } else if (document.getElementById('amount-xrd-provide-lp').value == '' || document.getElementById('amount-stab-provide-lp').value == '') {
        enable = false;
    } else if (parseFloat(document.getElementById('amount-xrd-provide-lp').value) == 0 || parseFloat(document.getElementById('amount-stab-provide-lp').value) == 0) {
        enable = false;
    }

    if (enable) {
        provideButton.style.backgroundColor = "";
        provideButton.disabled = false;
    } else {
        provideButton.style.backgroundColor = "hsl(0, 0%, 0%)";
        provideButton.disabled = true;
    }
}

function setRemoveLpButton() {
    var button = document.getElementById('remove');
    var enable = true;
    if (isConnected == false) {
        enable = false;
    } else if (parseFloat(document.getElementById('amount-remove-lp').value) > walletLp) {
        enable = false;
    } else if (document.getElementById('amount-remove-lp').value == '') {
        enable = false;
    } else if (parseFloat(document.getElementById('amount-remove-lp').value) == 0) {
        enable = false;
    }

    if (enable) {
        button.style.backgroundColor = "";
        button.disabled = false;
    } else {
        button.style.backgroundColor = "hsl(0, 0%, 0%)";
        button.disabled = true;
    }
}

function setBorrowButton() {
    var button = document.getElementById('mint-button');
    var enable = true;
    if (isConnected == false) {
        enable = false;
    } else if (parseFloat(document.getElementById('colToUse').value) > availableCollateral) {
        enable = false;
    } else if (document.getElementById('colToUse').value == '') {
        enable = false;
    } else if (parseFloat(document.getElementById('colToUse').value) == 0) {
        enable = false;
    } else if (mintAmount < 1) {
        enable = false;
    }

    if (enable) {
        button.style.backgroundColor = "";
        button.disabled = false;
    } else {
        button.style.backgroundColor = "hsl(0, 0%, 0%)";
        button.disabled = true;
    }
}

function setCloseLoanButton() {
    var button = document.getElementById('close-entire-button');
    var enable = true;
    var message = "";
    if (isConnected == false) {
        enable = false;
    } else if (parseFloat(debtAmount) > walletStab) {
        enable = false;
        message = "Insufficient STAB to close loan.";
    } else if (selectedCdp == undefined) {
        enable = false;
    } else if (status == "Marked") {
        enable = false;
        message = "Cannot close marked loans.";
    }

    if (enable) {
        button.style.backgroundColor = "";
        button.disabled = false;
        document.getElementById('warning-message-close').style.display = 'none';
    } else {
        button.style.backgroundColor = "hsl(0, 0%, 0%)";
        button.disabled = true;
        if (message != "") {
            document.getElementById('message-close').textContent = message;
            document.getElementById('warning-message-close').style.display = 'block';
        }
    }
}

function setAddColButton() {
    var sliderCol = document.getElementById('slider-col');
    updateSliderBackground(sliderCol);
    var button = document.getElementById('add-col-button');
    var enable = true;
    var onlyButton = false;
    var zeroInput = false;
    if (isConnected == false) {
        enable = false;
    } else if (selectedCdp == undefined) {
        enable = false;
    } else if (status == "Liquidated" || status == "ForceLiquidated" || status == "Closed") {
        enable = false;
    } else if (parseFloat(document.getElementById('amount-to-remove').value) > availableCollateral) {
        enable = false;
        onlyButton = true;
    } else if (newCr < 150) {
        enable = false;
        onlyButton = true;
    } else if (document.getElementById('amount-to-remove').value == '' || parseFloat(document.getElementById('amount-to-remove').value) == 0) {
        enable = false;
        onlyButton = true;
        zeroInput = true;
    }

    if (enable) {
        button.style.backgroundColor = "";
        button.disabled = false;
        document.getElementById('slider-col').disabled = false;
        document.getElementById('amount-to-remove').disabled = false;
        document.getElementById('max-new-cr').disabled = false;
        document.getElementById('new-cr').style.color = "";
        document.getElementById('max-new-cr').style.cursor = "pointer";
        document.getElementById('max-new-cr').style.fontWeight = "";
    } else {
        button.style.backgroundColor = "hsl(0, 0%, 0%)";
        button.disabled = true;
        if (onlyButton == false) {
            document.getElementById('new-cr').style.color = "";
            document.getElementById('slider-col').disabled = true;
            document.getElementById('amount-to-remove').disabled = true;
            document.getElementById('max-new-cr').disabled = true;
            document.getElementById('max-new-cr').style.cursor = "default";
            document.getElementById('new-cr').textContent = "New CR: -";
            document.getElementById('max-new-cr').textContent = "Max CR: -";
            document.getElementById('max-new-cr').style.fontWeight = "normal";
        }
        if (onlyButton == true) {
            if (zeroInput == true) {
                document.getElementById('new-cr').style.color = "";
            } else {
                document.getElementById('new-cr').style.color = "red";
            }
            document.getElementById('max-new-cr').style.cursor = "pointer";
            document.getElementById('max-new-cr').style.fontWeight = "";
            document.getElementById('slider-col').disabled = false;
            document.getElementById('amount-to-remove').disabled = false;
            document.getElementById('max-new-cr').disabled = false;
        }
    }
}

function setRemoveColButton() {
    var sliderCol = document.getElementById('slider-col');
    updateSliderBackground(sliderCol);
    document.getElementById('new-cr').style.color = "";
    var button = document.getElementById('remove-col-button');
    var enable = true;
    var message = "";
    var onlyButton = false;
    var zeroInput = false;
    if (isConnected == false) {
        enable = false;
    } else if (selectedCdp == undefined) {
        enable = false;
    } else if (status == "Liquidated" || status == "ForceLiquidated" || status == "Closed") {
        enable = false;
    } else if (newCr < 150) {
        enable = false;
        onlyButton = true;
        document.getElementById('new-cr').style.color = "red";
    } else if (document.getElementById('amount-to-remove').value == '' || parseFloat(document.getElementById('amount-to-remove').value) == 0) {
        enable = false;
        onlyButton = true;
        zeroInput = true;
    }

    if (enable) {
        button.style.backgroundColor = "";
        button.disabled = false;
        document.getElementById('slider-col').disabled = false;
        document.getElementById('amount-to-remove').disabled = false;
        document.getElementById('max-new-cr').disabled = false;
        document.getElementById('max-new-cr').style.cursor = "pointer";
        document.getElementById('max-new-cr').style.fontWeight = "";
    } else {
        button.style.backgroundColor = "hsl(0, 0%, 0%)";
        button.disabled = true;
        if (onlyButton == false) {
            document.getElementById('new-cr').style.color = "";
            document.getElementById('slider-col').disabled = true;
            document.getElementById('amount-to-remove').disabled = true;
            document.getElementById('max-new-cr').disabled = true;
            document.getElementById('max-new-cr').style.cursor = "default";
            document.getElementById('new-cr').textContent = "New CR: -";
            document.getElementById('max-new-cr').textContent = "Max CR: -";
            document.getElementById('max-new-cr').style.fontWeight = "normal";
        }
        if (onlyButton == true) {
            if (zeroInput == true) {
                document.getElementById('new-cr').style.color = "";
            } else {
                document.getElementById('new-cr').style.color = "red";
            }
            document.getElementById('max-new-cr').style.cursor = "pointer";
            document.getElementById('max-new-cr').style.fontWeight = "";
            document.getElementById('slider-col').disabled = false;
            if (newCr < 150) {
                document.getElementById('amount-to-remove').disabled = true;
            } else {
                document.getElementById('amount-to-remove').disabled = false;
            }
            document.getElementById('max-new-cr').disabled = false;
            console.log("only button");
        }
    }
}

function setRemoveDebtButton() {
    document.getElementById('new-cr-debt').style.color = "";
    var sliderDebt = document.getElementById('slider-debt');
    updateSliderBackground(sliderDebt);
    var button = document.getElementById('add-debt-button');
    var enable = true;
    var onlyButton = false;
    var zeroInput = false;
    if (isConnected == false) {
        enable = false;
    } else if (selectedCdp == undefined) {
        enable = false;
    } else if (status == "Liquidated" || status == "ForceLiquidated" || status == "Closed") {
        enable = false;
    } else if (parseFloat(document.getElementById('amount-to-remove-debt').value) > walletStab) {
        enable = false;
        onlyButton = true;
    } else if (newCrDebt < 150) {
        enable = false;
        onlyButton = true;
        document.getElementById('new-cr-debt').style.color = "red";
    } else if (document.getElementById('amount-to-remove-debt').value == '' || parseFloat(document.getElementById('amount-to-remove-debt').value) == 0) {
        enable = false;
        onlyButton = true;
        zeroInput = true;
    }

    if (enable) {
        button.style.backgroundColor = "";
        button.disabled = false;
        document.getElementById('slider-debt').disabled = false;
        document.getElementById('amount-to-remove-debt').disabled = false;
        document.getElementById('max-new-cr-debt').disabled = false;
        document.getElementById('new-cr-debt').style.color = "";
        document.getElementById('max-new-cr-debt').style.cursor = "pointer";
        document.getElementById('max-new-cr-debt').style.fontWeight = "";
    } else {
        button.style.backgroundColor = "hsl(0, 0%, 0%)";
        button.disabled = true;
        if (onlyButton == false) {
            document.getElementById('slider-debt').disabled = true;
            document.getElementById('amount-to-remove-debt').disabled = true;
            document.getElementById('max-new-cr-debt').disabled = true;
            document.getElementById('max-new-cr-debt').style.cursor = "default";
            document.getElementById('new-cr-debt').textContent = "New CR: -";
            document.getElementById('max-new-cr-debt').textContent = "Max CR: -";
            document.getElementById('max-new-cr-debt').style.fontWeight = "normal";
        }
        if (onlyButton == true) {
            document.getElementById('max-new-cr-debt').style.cursor = "pointer";
            document.getElementById('max-new-cr-debt').style.fontWeight = "";
            document.getElementById('slider-debt').disabled = false;
            document.getElementById('amount-to-remove-debt').disabled = false;
            document.getElementById('max-new-cr-debt').disabled = false;
        }
    }
}

function setAddDebtButton() {
    var sliderDebt = document.getElementById('slider-debt');
    updateSliderBackground(sliderDebt);
    var button = document.getElementById('remove-debt-button');
    var enable = true;
    var onlyButton = false;
    document.getElementById('new-cr-debt').style.color = "";
    if (isConnected == false) {
        enable = false;
    } else if (selectedCdp == undefined) {
        enable = false;
    } else if (status == "Liquidated" || status == "ForceLiquidated" || status == "Closed") {
        enable = false;
    } else if (parseFloat(document.getElementById('amount-to-remove-debt').value) > walletStab) {
        enable = false;
        onlyButton = true;
    } else if (newCrDebt < 150) {
        enable = false;
        onlyButton = true;
        document.getElementById('new-cr-debt').style.color = "red";
    } else if (document.getElementById('amount-to-remove-debt').value == '' || parseFloat(document.getElementById('amount-to-remove-debt').value) == 0) {
        enable = false;
        onlyButton = true;
    }

    if (enable) {
        button.style.backgroundColor = "";
        button.disabled = false;
        document.getElementById('slider-debt').disabled = false;
        document.getElementById('amount-to-remove-debt').disabled = false;
        document.getElementById('max-new-cr-debt').disabled = false;
        document.getElementById('max-new-cr-debt').style.cursor = "pointer";
        document.getElementById('max-new-cr-debt').style.fontWeight = "";
    } else {
        button.style.backgroundColor = "hsl(0, 0%, 0%)";
        button.disabled = true;
        if (onlyButton == false) {
            document.getElementById('slider-debt').disabled = true;
            document.getElementById('amount-to-remove-debt').disabled = true;
            document.getElementById('max-new-cr-debt').disabled = true;
            document.getElementById('max-new-cr-debt').style.cursor = "default";
            document.getElementById('new-cr-debt').textContent = "New CR: -";
            document.getElementById('max-new-cr-debt').textContent = "Max CR: -";
            document.getElementById('max-new-cr-debt').style.fontWeight = "normal";
        }
        if (onlyButton == true) {
            document.getElementById('max-new-cr-debt').style.cursor = "pointer";
            document.getElementById('max-new-cr-debt').style.fontWeight = "";
            document.getElementById('slider-debt').disabled = false;
            if (newCrDebt < 150) {
                document.getElementById('amount-to-remove-debt').disabled = true;
            } else {
                document.getElementById('amount-to-remove-debt').disabled = false;
            }
            document.getElementById('max-new-cr-debt').disabled = false;
        }
    }
}

function setMarkLiqButton() {
    var button = document.getElementById('liqwithmark');
    var enable = true;
    var message = "";
    if (isConnected == false) {
        enable = false;
    } else if (parseFloat(debtAmount) > walletStab) {
        enable = false;
        message = "Insufficient STAB to liquidate loan.";
    } else if (selectedMarker == undefined) {
        enable = false;
    } else if (document.getElementById('marker-state').textContent == "Pending") {
        enable = false;
    }

    if (enable) {
        button.style.backgroundColor = "";
        button.disabled = false;
        document.getElementById('warning-message-liq').style.display = 'none';
    } else {
        button.style.backgroundColor = "hsl(0, 0%, 0%)";
        button.disabled = true;
        document.getElementById('warning-message-liq').style.display = 'none';
        if (message != "") {
            document.getElementById('warning-message-liq').style.display = 'block';
        }
    }
}

function setNoMarkLiqButton() {
    if (bigFail == true) {
        return;
    }
    var button = document.getElementById('liqnextskip');
    var enable = true;
    var message = "";
    if (isConnected == false) {
        enable = false;
    } else if (parseFloat(liqNextStab) > walletStab) {
        enable = false;
        message = "Insufficient STAB to liquidate loan.";
    } else if (cantLiqWithSkips) {
        enable = false;
    }

    if (enable) {
        button.style.backgroundColor = "";
        button.disabled = false;
        document.getElementById('warning-liq-not-enough-stab').style.display = 'none';
    } else {
        button.style.backgroundColor = "hsl(0, 0%, 0%)";
        button.disabled = true;
        if (message != "") {
            document.getElementById('warning-liq-not-enough-stab').style.display = 'block';
        }
    }
}

function calculateChange() {
    setSwapButton();
    var inputAmount = parseFloat(document.getElementById('amount-sell').value);
    var parsedStabPoolAmount = parseFloat(stabPoolAmount);
    var parsedXrdPoolAmount = parseFloat(xrdPoolAmount);
    var percentage = document.getElementById('percentage-change');
    if (isNaN(inputAmount)) {
        inputAmount = 0;
    }
    if (sell == true) {
        let outputAmount = (parsedStabPoolAmount * (1 - fee) * inputAmount)
            / (parsedXrdPoolAmount + inputAmount * (1 - fee));
        var newparsedXrdPoolAmount = parsedXrdPoolAmount + inputAmount;
        var newparsedStabPoolAmount = parsedStabPoolAmount - outputAmount;
        var percentageChange = ((((newparsedXrdPoolAmount / newparsedStabPoolAmount) - (parsedXrdPoolAmount / parsedStabPoolAmount)) / (parsedXrdPoolAmount / parsedStabPoolAmount))) * 100;
        var idealRatio = internalPrice / xrdPrice;
        if (parsedXrdPoolAmount / parsedStabPoolAmount > idealRatio) {
            percentage.style.color = "red";
        } else {
            if (newparsedXrdPoolAmount / newparsedStabPoolAmount < idealRatio) {
                percentage.style.color = "green";
            } else {
                percentage.style.color = "red";
            }
        }
        document.getElementById('percentage-change').childNodes[0].nodeValue = "+" + percentageChange.toFixed(2) + "%";
    } else {
        let outputAmount = (parsedXrdPoolAmount * (1 - fee) * inputAmount)
            / (parsedStabPoolAmount + inputAmount * (1 - fee));
        var newparsedXrdPoolAmount = parseFloat(parsedXrdPoolAmount) - outputAmount;
        var newparsedStabPoolAmount = parseFloat(parsedStabPoolAmount) + inputAmount;
        var percentageChange = ((((newparsedStabPoolAmount / newparsedXrdPoolAmount) - (parsedStabPoolAmount / parsedXrdPoolAmount)) / (parsedStabPoolAmount / parsedXrdPoolAmount))) * 100;
        var idealRatio = internalPrice / xrdPrice;
        if (parsedXrdPoolAmount / parsedStabPoolAmount < idealRatio) {
            percentage.style.color = "red";
        } else {
            if (newparsedXrdPoolAmount / newparsedStabPoolAmount > idealRatio) {
                percentage.style.color = "green";
            } else {
                percentage.style.color = "red";
            }
        }
        document.getElementById('percentage-change').childNodes[0].nodeValue = "+" + percentageChange.toFixed(2) + "%";
    }
}

async function checkMarking(amount) {
    // URL to get the gateway status
    const statusUrl = "https://stokenet.radixdlt.com/status/gateway-status";

    const headers = {
        "Content-Type": "application/json"
    };

    try {
        // Fetch the gateway status to get the current epoch
        const statusResponse = await fetch(statusUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({}) // Sending an empty body
        });
        const statusData = await statusResponse.json();

        // Extract the current epoch
        const currentEpoch = statusData.ledger_state.epoch;
        const startEpochInclusive = currentEpoch;
        const endEpochExclusive = currentEpoch + 2;

        // URL to send the POST request to
        const url = "https://stokenet.radixdlt.com/transaction/preview";

        // Base manifest string
        let manifestString = '';

        // Repeat the specified part of the manifest
        const repeatManifest = `
            CALL_METHOD
                Address("${componentAddress}")
                "mark_for_liquidation"
                Address("resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc")
                ;
            `;

        for (let i = 0; i < amount; i++) {
            manifestString += repeatManifest;
        }

        // Add the remaining part of the manifest
        manifestString += `
            CALL_METHOD
                Address("account_tdx_2_168z9kn6xeg7s0m7qsgdf5wmvsh0v656ndkh295d8p4j5lu47ta5rnv")
                "deposit_batch"
                Expression("ENTIRE_WORKTOP");
            `;

        // JSON payload
        const payload = {
            "manifest": manifestString,
            "start_epoch_inclusive": startEpochInclusive,
            "end_epoch_exclusive": endEpochExclusive,
            "tip_percentage": 0,
            "nonce": 1,
            "signer_public_keys": [
                {
                    "key_type": "EcdsaSecp256k1",
                    "key_hex": "0305684de356f5126befda977935827f6f74ca3b7865cd8516ca72ef7afc8c0e06"
                }
            ],
            "flags": {
                "use_free_credit": true,
                "assume_all_signature_proofs": true,
                "skip_epoch_check": true,
                "disable_auth_checks": true
            }
        };

        // Send the POST request
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        // Parse and save the response to a variable
        const responseData = await response.json();
        console.log(responseData);

        // Log the response data
        if (responseData.receipt.status === 'Succeeded') {
            document.getElementById('warning-mark').style.display = 'none';
            document.getElementById('mark').style.backgroundColor = "";
            document.getElementById('mark').disabled = false;
            bigFail = false;
        } else {
            document.getElementById('warning-mark').style.display = 'block';
            document.getElementById('mark').style.backgroundColor = "hsl(0, 0%, 0%)";
            document.getElementById('mark').disabled = true;
            bigFail = true;
        }

        return responseData;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

async function checkLiquidation(toSkip) {
    // URL to get the gateway status
    const statusUrl = "https://stokenet.radixdlt.com/status/gateway-status";

    const headers = {
        "Content-Type": "application/json"
    };

    try {
        // Fetch the gateway status to get the current epoch
        const statusResponse = await fetch(statusUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({}) // Sending an empty body
        });
        const statusData = await statusResponse.json();

        // Extract the current epoch
        const currentEpoch = statusData.ledger_state.epoch;
        const startEpochInclusive = currentEpoch;
        const endEpochExclusive = currentEpoch + 2;

        // URL to send the POST request to
        const url = "https://stokenet.radixdlt.com/transaction/preview";

        // Repeat the specified part of the manifest
        let manifest = `CALL_METHOD
            Address("account_tdx_2_168z9kn6xeg7s0m7qsgdf5wmvsh0v656ndkh295d8p4j5lu47ta5rnv")
            "create_proof_of_amount"
            Address("${ctrlBadgeAddress}")
            Decimal("0.75");


        CALL_METHOD
            Address("${stabComponentAddress}")
            "free_stab"
            Decimal("100000000");

        TAKE_ALL_FROM_WORKTOP
            Address("${stabAddress}")
            Bucket("stab");

        CALL_METHOD
            Address("${componentAddress}")
            "liquidate_position_without_marker"
            Bucket("stab")
            true
            ${toSkip}i64
            NonFungibleLocalId("#0#");

        CALL_METHOD
            Address("account_tdx_2_168z9kn6xeg7s0m7qsgdf5wmvsh0v656ndkh295d8p4j5lu47ta5rnv")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP");
            `;

        // JSON payload
        const payload = {
            "manifest": manifest,
            "start_epoch_inclusive": startEpochInclusive,
            "end_epoch_exclusive": endEpochExclusive,
            "tip_percentage": 0,
            "nonce": 1,
            "signer_public_keys": [
                {
                    "key_type": "EcdsaSecp256k1",
                    "key_hex": "0305684de356f5126befda977935827f6f74ca3b7865cd8516ca72ef7afc8c0e06"
                }
            ],
            "flags": {
                "use_free_credit": true,
                "assume_all_signature_proofs": true,
                "skip_epoch_check": true,
                "disable_auth_checks": true
            }
        };

        // Send the POST request
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload)
        });

        // Parse and save the response to a variable
        const responseData = await response.json();

        console.log(manifest);
        console.log(responseData);

        // Log the response data
        if (responseData.receipt.status === 'Succeeded') {
            cantLiqWithSkips = false;
            document.getElementById('warning-liq').style.display = 'none';

            const resourceChanges = responseData.resource_changes;

            // Helper function to find amounts by resource address within the same parent
            const findAmountsAndThirdResource = (resource1, resource2) => {
                for (const change of resourceChanges) {
                    const amounts = { [resource1]: null, [resource2]: null, thirdResource: { address: null, amount: null } };
                    for (const resourceChange of change.resource_changes) {
                        if (resourceChange.resource_address === resource1) {
                            amounts[resource1] = resourceChange.amount;
                        } else if (resourceChange.resource_address === resource2) {
                            amounts[resource2] = resourceChange.amount;
                        } else {
                            amounts.thirdResource.address = resourceChange.resource_address;
                            amounts.thirdResource.amount = resourceChange.amount;
                        }
                    }
                    if (amounts[resource1] && amounts[resource2] && amounts.thirdResource.address) {
                        return amounts;
                    }
                }
                return null;
            };

            // Resource addresses to look for
            const resource1 = stabAddress;
            const resource2 = liqAddress;

            // Find amounts for specified resources within the same parent
            const amounts = findAmountsAndThirdResource(resource1, resource2);

            if (amounts) {
                liqNextStab = 100000000 - amounts[resource1];
                if (liqNextStab <= walletStab) {
                    if (isConnected == true) {
                        console.log(liqNextStab, walletStab);
                        document.getElementById('liqnextskip').style.backgroundColor = "";
                        document.getElementById('liqnextskip').disabled = false;
                    }
                } else if (liqNextStab > walletStab && isConnected == true) {
                    document.getElementById('warning-liq-not-enough-stab').style.display = 'block';
                    document.getElementById('warning-liq').style.display = 'none';
                    document.getElementById('liqnextskip').style.backgroundColor = "hsl(0, 0%, 0%)";
                    cantLiqWithSkips = true;
                } else if (isConnected == false) {
                    document.getElementById('warning-liq').style.display = 'none';
                    document.getElementById('warning-liq-not-enough-stab').style.display = 'none';
                    document.getElementById('liqnextskip').style.backgroundColor = "hsl(0, 0%, 0%)";
                    cantLiqWithSkips = true;
                }
                liqRewardAddress = amounts.thirdResource.address;
                document.getElementById("stab-debt").textContent = (1 * liqNextStab).toFixed(2) + " STAB";
                document.getElementById("col-reward").textContent = (1 * amounts.thirdResource.amount).toFixed(2) + " " + getResourceName(amounts.thirdResource.address);
            } else {
                console.log('Could not find all specified resources within the same parent.');
            }
        } else {
            document.getElementById('warning-liq').style.display = 'block';
            document.getElementById('warning-liq-not-enough-stab').style.display = 'none';
            document.getElementById('liqnextskip').style.backgroundColor = "hsl(0, 0%, 0%)";
            cantLiqWithSkips = true;
            document.getElementById("stab-debt").textContent = "-";
            document.getElementById("col-reward").textContent = "-";
        }

        setNoMarkLiqButton();

        return responseData;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

async function update_id() {
    if (window.location.pathname === '/incentives') {
        let request = {
            "resource_address": stabIdAddress,
            "non_fungible_ids": [selectedId],
        };
        if (selectedId === undefined) {
            return;
        }

        await fetch("https://stokenet.radixdlt.com/state/non-fungible/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        })
            .then(response => response.json())
            .then(data => {
                lpAmountId = data.non_fungible_ids[0].data.programmatic_json.fields[0].elements[1].value;
                lpWaitingAmount = data.non_fungible_ids[0].data.programmatic_json.fields[1].elements[1].value;
                nextClaim = data.non_fungible_ids[0].data.programmatic_json.fields[2].value;
                ilisAmountId = data.non_fungible_ids[0].data.programmatic_json.fields[0].elements[0].value;
                ilisWaitingAmount = data.non_fungible_ids[0].data.programmatic_json.fields[1].elements[0].value;
            })
            .catch(error => console.error('Error:', error));

        document.getElementById('lpAmountId').textContent = (1 * lpAmountId).toFixed(2) + ` (${(1 * lpWaitingAmount).toFixed(2)})`;
        document.getElementById('ilisAmountId').textContent = (1 * ilisAmountId).toFixed(2) + ` (${(1 * ilisWaitingAmount).toFixed(2)})`;
        document.getElementById('nextClaim').textContent = Math.min(currentPeriod - nextClaim + 1, 5);

        let stakeIlisMax = document.getElementById('stake-ilis-amount');
        let formattedWalletIlis = (Math.floor(walletIlis * 10) / 10).toLocaleString('en-US');
        stakeIlisMax.textContent = "max. " + formattedWalletIlis;
        stakeIlisMax.style.cursor = "pointer";
        stakeIlisMax.addEventListener('click', function () {
            let inputField = document.getElementById('stake-ilis-field');
            inputField.value = Math.floor(walletIlis * 10) / 10;
        });
        let stakeLpMax = document.getElementById('stake-lp-amount');
        let formattedWalletLp = (Math.floor(walletLp * 10) / 10).toLocaleString('en-US');
        stakeLpMax.textContent = "max. " + formattedWalletLp;
        stakeLpMax.style.cursor = "pointer";
        stakeLpMax.addEventListener('click', function () {
            let inputField = document.getElementById('stake-lp-field');
            inputField.value = Math.floor(walletLp * 10) / 10;
        });
        let unstakeIlisMax = document.getElementById('unstake-ilis-amount');
        let formattedWalletIlisUnstake = (Math.floor((ilisAmountId + ilisWaitingAmount) * 10) / 10).toLocaleString('en-US');
        unstakeIlisMax.textContent = "max. " + formattedWalletIlisUnstake;
        unstakeIlisMax.style.cursor = "pointer";
        unstakeIlisMax.addEventListener('click', function () {
            let inputField = document.getElementById('unstake-ilis-field');
            inputField.value = Math.floor((ilisAmountId + ilisWaitingAmount) * 10) / 10;
        });
        let unstakeLpMax = document.getElementById('unstake-lp-amount');
        let formattedWalletLpUnstake = (Math.floor((lpAmountId + lpWaitingAmount) * 10) / 10).toLocaleString('en-US');
        unstakeLpMax.textContent = "max. " + formattedWalletLpUnstake;
        unstakeLpMax.style.cursor = "pointer";
        unstakeLpMax.addEventListener('click', function () {
            let inputField = document.getElementById('unstake-lp-field');
            inputField.value = Math.floor((lpAmountId + lpWaitingAmount) * 10) / 10;
        });
    }
}

async function update_liq() {
    if (window.location.pathname === '/liquidations') {
        if (selectedMarker === undefined) {
            setNoMarkLiqButton();
            setMarkLiqButton();
            return;
        }
        (async () => { // Wrap your code in an async function
            let request2 = {
                "resource_address": markerAddress,
                "non_fungible_ids": [selectedMarker],
            };

            try {
                let response = await fetch("https://stokenet.radixdlt.com/state/non-fungible/data", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(request2)
                });

                let data = await response.json();

                markedTime = data.non_fungible_ids[0].data.programmatic_json.fields[1].value;
                markerUsed = data.non_fungible_ids[0].data.programmatic_json.fields[4].value;

                let timestamp = parseInt(markedTime) * 1000; // Your timestamp
                markerDate = new Date(timestamp).toLocaleString();
                let now = Date.now();
                let timeDiffMin = (now - new Date(timestamp)) / 1000 / 60;

                // Use markedId here
                let request = {
                    "resource_address": cdpAddress,
                    "non_fungible_ids": [data.non_fungible_ids[0].data.programmatic_json.fields[2].value],
                };

                response = await fetch("https://stokenet.radixdlt.com/state/non-fungible/data", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(request)
                });

                let data2 = await response.json();

                let collateralName;

                if (data2.non_fungible_ids[0].is_burned == false) {
                    resourceAddress = data2.non_fungible_ids[0].data.programmatic_json.fields[0].value;
                    const resource = acceptedResources.find(ar => ar[1] === resourceAddress);
                    validatorMultiplier = resource[4];
                    parentAddress = data2.non_fungible_ids[0].data.programmatic_json.fields[1].value;
                    collateralAmount = data2.non_fungible_ids[0].data.programmatic_json.fields[3].value;
                    debtAmount = data2.non_fungible_ids[0].data.programmatic_json.fields[4].value;
                    cr = data2.non_fungible_ids[0].data.programmatic_json.fields[5].value;
                    status = data2.non_fungible_ids[0].data.programmatic_json.fields[6].variant_name;
                    collateralName = getResourceName(resourceAddress);
                } else {
                    parentAddress = "-";
                    collateralAmount = "-";
                    debtAmount = "-";
                    cr = "-";
                    status = "Receipt burned";
                    collateralName = "-";
                }

                document.getElementById('status').textContent = status;
                if (collateralName == "XRD") {
                    document.getElementById('collateralAmount').textContent = (1 * collateralAmount).toFixed(2) + " " + collateralName;;
                    document.getElementById('debtAmount').textContent = (1 * debtAmount).toFixed(2) + " STAB";
                    document.getElementById('cr').textContent = (cr * xrdPrice * 100).toFixed(2) + "%";
                } else if (collateralName == "-") {
                    document.getElementById('collateralAmount').textContent = "";
                    document.getElementById('debtAmount').textContent = "-";
                    document.getElementById('cr').textContent = "-";
                    document.getElementById('status').style.color = 'red';
                } else {
                    document.getElementById('collateralAmount').textContent = (1 * collateralAmount).toFixed(2) + " " + collateralName;
                    document.getElementById('debtAmount').textContent = (1 * debtAmount).toFixed(2) + " STAB";
                    document.getElementById('cr').textContent = (cr * xrdPrice * 100).toFixed(2) + "%";
                }
                if (markerUsed == true) {
                    document.getElementById('marker-state').style.color = 'red';
                    document.getElementById('marker-state').textContent = "Expired";
                    document.getElementById('liqwithmark').querySelector('.button-text').textContent = "BURN MARKER";
                    markerUsable = true;
                } else if (timeDiffMin > 5) {
                    document.getElementById('liqwithmark').querySelector('.button-text').textContent = "LIQUIDATE";
                    document.getElementById('marker-state').style.color = 'green';
                    document.getElementById('marker-state').textContent = "Useable";
                    markerUsable = true;
                } else {
                    document.getElementById('liqwithmark').querySelector('.button-text').textContent = "LIQUIDATE";
                    document.getElementById('marker-state').style.color = 'orange';
                    document.getElementById('marker-state').textContent = "Pending";
                    markerUsable = false;
                }
                document.getElementById('marker-time').textContent = markerDate;

                if (status == "Liquidated") {
                    document.getElementById('status').style.color = 'red';
                    document.getElementById('debtAmount').textContent = "-";
                    document.getElementById('cr').textContent = "-";
                } else if (status == "Marked") {
                    document.getElementById('status').style.color = 'green';
                }
                else if (status == "Closed" || status == "Healthy") {
                    document.getElementById('status').style.color = 'black';
                }
                setNoMarkLiqButton();
                setMarkLiqButton();
            } catch (error) {
                console.error('Error:', error);
            }
        })();

        //setNoMarkLiqButton();
        //setMarkLiqButton();
    }
}

async function update_cdp() {

    if (window.location.pathname === '/manage-loans') {
        var sliderCol = document.getElementById('slider-col');
        var sliderDebt = document.getElementById('slider-debt');
        updateSliderBackground(sliderCol);
        updateSliderBackground(sliderDebt);

        sliderCol.addEventListener('input', function () {
            updateSliderBackground(this);
        });

        sliderDebt.addEventListener('input', function () {
            updateSliderBackground(this);
        });

        if (selectedCdp === undefined) {
            if (addingCollateral) {
                setAddColButton();
            } else {
                setRemoveColButton();
            }
            if (addingDebt) {
                setAddDebtButton();
            }
            else {
                setRemoveDebtButton();
            }
            return;
        }
        let request = {
            "resource_address": cdpAddress,
            "non_fungible_ids": [selectedCdp],
        };


        await fetch("https://stokenet.radixdlt.com/state/non-fungible/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(request)
        })
            .then(response => response.json())
            .then(data => {
                resourceAddress = data.non_fungible_ids[0].data.programmatic_json.fields[0].value;
                const resource = acceptedResources.find(ar => ar[1] === resourceAddress);
                validatorMultiplier = resource[4];
                collateralAmount = data.non_fungible_ids[0].data.programmatic_json.fields[3].value;
                debtAmount = data.non_fungible_ids[0].data.programmatic_json.fields[4].value;
                status = data.non_fungible_ids[0].data.programmatic_json.fields[6].variant_name;
                upToDateCr = getUpToDateCr(collateralAmount, debtAmount, validatorMultiplier);
                cr = upToDateCr;
                availableCollateral = getResourceAmount(resourceAddress, bigData, 0);
                if (addingCollateral) {
                    maxCr = getUpToDateCr(parseFloat(availableCollateral) + parseFloat(collateralAmount), debtAmount, validatorMultiplier) * 100;
                    newCr = (upToDateCr * 100).toFixed(2);
                    var slider = document.getElementById('slider-col');
                    slider.min = newCr;
                    slider.max = maxCr > 1000 ? 1000 : maxCr;
                    slider.value = Math.round(newCr * 100) / 100;
                } else {
                    newCr = (upToDateCr * 100).toFixed(2);
                    maxCr = (upToDateCr * 100).toFixed(2);
                    var slider = document.getElementById('slider-col');
                    slider.min = 0;
                    slider.max = maxCr - 150;
                    slider.value = slider.min; // Set the value to the min value
                }

                if (addingDebt == false) {
                    var minDebtAmount = Math.max(debtAmount - walletStab, 1);
                    maxCrDebt = getUpToDateCr(parseFloat(collateralAmount), minDebtAmount, validatorMultiplier) * 100;
                    newCrDebt = (upToDateCr * 100).toFixed(2);
                    var slider = document.getElementById('slider-debt');
                    slider.min = newCrDebt;
                    slider.max = maxCrDebt > 1000 ? 1000 : maxCrDebt;
                    slider.value = Math.round(newCrDebt * 100) / 100;
                } else {
                    newCrDebt = (upToDateCr * 100).toFixed(2);
                    maxCrDebt = (upToDateCr * 100).toFixed(2);
                    var slider = document.getElementById('slider-debt');
                    slider.min = 0;
                    slider.max = maxCrDebt - 150;
                    slider.value = slider.min; // Set the value to the min value

                }

                document.getElementById('amount-to-remove').value = "0";
                document.getElementById('amount-to-remove-debt').value = "0";

                // Round minValue to two decimal places before setting the value


                acceptedResources.forEach(acceptedResource => {
                    if (acceptedResource[1] === resourceAddress) {
                        if (window.location.pathname === '/manage-loans') {
                            var secondLogoImage = document.getElementById('col-logo-upper');
                            secondLogoImage.src = acceptedResource[3];
                        }
                        var logoImage = document.querySelector('.input-logo');
                        logoImage.src = acceptedResource[3];
                    }
                });
            })
            .catch(error => console.error('Error:', error));

        let collateralName = getResourceName(resourceAddress);
        document.getElementById('status').textContent = status;
        document.getElementById('collateral').textContent = " " + collateralName;
        var button = document.getElementById('close-entire-button');
        var buttonText = button.querySelector('.button-text');

        if (collateralName == "XRD") {
            document.getElementById('collateralAmount').textContent = (1 * collateralAmount).toFixed(2);
        } else {
            document.getElementById('collateralAmount').textContent = (1 * collateralAmount).toFixed(2);
        }
        document.getElementById('debtAmount').textContent = (1 * debtAmount).toFixed(2) + " STAB";
        document.getElementById('cr').textContent = (upToDateCr * 100).toFixed(2) + "%";
        buttonText.textContent = "CLOSE LOAN";

        if ((status == "Liquidated" || status == "ForceLiquidated") && collateralAmount > 0) {
            buttonText.textContent = "RETRIEVE COLLATERAL";
            buttonText.color = 'white';
            button.backgroundColor = 'black';
            document.getElementById('status').style.color = 'red';
            document.getElementById('debtAmount').textContent = "-";
            document.getElementById('cr').textContent = "-";
        } else if (status == "Marked") {
            document.getElementById('new-cr').textContent = "New CR: " + (upToDateCr * 100).toFixed(2) + "%";
            if (addingCollateral) {
                document.getElementById('max-new-cr').textContent = "Max CR: " + (maxCr * 1).toFixed(2) + "%";
            } else {
                document.getElementById('max-new-cr').textContent = "Min CR: 150%";
            }
            document.getElementById('new-cr-debt').textContent = "New CR: " + (upToDateCr * 100).toFixed(2) + "%";
            if (addingDebt == false) {
                document.getElementById('max-new-cr-debt').textContent = "Max CR: " + (maxCrDebt * 1).toFixed(2) + "%";
            } else {
                document.getElementById('max-new-cr-debt').textContent = "Min CR: 150%";
            }
            buttonText.textContent = "CLOSE LOAN";
            document.getElementById('status').style.color = '#ef7200';
            button.backgroundColor = '';
            buttonText.color = '';
        }
        else if (status == "Closed" || (collateralAmount == 0 && (status == "Liquidated" || status == "ForceLiquidated"))) {
            buttonText.textContent = "BURN LOAN RECEIPT";
            if (status == "Closed") {
                document.getElementById('status').style.color = 'black';
            } else {
                document.getElementById('status').style.color = 'red';
            }
            document.getElementById('debtAmount').textContent = "-";
            document.getElementById('cr').textContent = "-";
            document.getElementById('collateralAmount').textContent = "";
            button.backgroundColor = '';
            buttonText.color = '';
        } else if (status == "Healthy") {
            if (upToDateCr * 100 < 150) {
                document.getElementById('status').textContent = "In Danger";
                document.getElementById('status').style.color = 'orange';
            } else {
                document.getElementById('status').style.color = 'green';
            }
            document.getElementById('new-cr').textContent = "New CR: " + (upToDateCr * 100).toFixed(2) + "%";
            if (addingCollateral) {
                document.getElementById('max-new-cr').textContent = "Max CR: " + (maxCr * 1).toFixed(2) + "%";
            } else {
                document.getElementById('max-new-cr').textContent = "Min CR: 150%";
            }
            document.getElementById('new-cr-debt').textContent = "New CR: " + (upToDateCr * 100).toFixed(2) + "%";
            if (addingDebt == false) {
                document.getElementById('max-new-cr-debt').textContent = "Max CR: " + (maxCrDebt * 1).toFixed(2) + "%";
            } else {
                document.getElementById('max-new-cr-debt').textContent = "Min CR: 150%";
            }
            buttonText.textContent = "CLOSE LOAN";
            button.backgroundColor = '';
            buttonText.color = '';
        }
        setCloseLoanButton();
        if (addingCollateral) {
            setAddColButton();
        } else {
            setRemoveColButton();
        }
        if (addingDebt) {
            setAddDebtButton();
        }
        else {
            setRemoveDebtButton();
        }
    }
}

function getResourceAmount(resourceAddress, data, itemIndex) {
    let item = data[itemIndex];
    if (item.fungible_resources && item.fungible_resources.items) {
        const resource = item.fungible_resources.items.find(frItem => frItem.resource_address === resourceAddress);
        if (resource && resource.vaults && resource.vaults.items.length > 0) {
            return resource.vaults.items[0].amount;
        }
    }
    return 0;
}

function getResourceName(resourceAddress) {
    // Find the resource in the acceptedResources array
    const resource = acceptedResources.find(ar => ar[1] === resourceAddress);
    return resource[0];
}

function getValidatorAddress(resourceAddress) {
    // Find the resource in the acceptedResources array
    const resource = acceptedResources.find(ar => ar[1] === resourceAddress);

    // If the resource was found, return the validator address
    if (resource) {
        return resource[2];
    }

    // If the resource was not found, return an empty string or any default value
    return '';
}

function getLogo(resourceAddress) {
    // Find the resource in the acceptedResources array
    const resource = acceptedResources.find(ar => ar[1] === resourceAddress);
    return resource[3];
}

function customRound(num) {
    if (num < 1) {
        return num.toFixed(5);
    } else if (num < 10) {
        return num.toFixed(4);
    } else if (num < 100) {
        return num.toFixed(3);
    } else if (num < 1000) {
        return num.toFixed(2);
    } else if (num < 10000) {
        return num.toFixed(1);
    } else {
        return Math.round(num).toString();
    }
}

// Store the original texts of the buttons
var originalTexts = [];
var isConnected = false;

// Select all buttons
var buttons = document.querySelectorAll('button.wallet-necessary');

// Add a click event listener to each button
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        // Store the original text and change the button text to "Connect wallet"
        if (!isConnected) {
            this.querySelector('.warning').style.display = 'block';
            this.querySelector('.chevron').style.display = 'none';
            this.querySelector('.button-text').style.display = 'none';
            this.querySelector('.button-warning').style.display = 'block';
            this.style.backgroundColor = "red"; // Change to the desired background color
        }
    });
}

// Function to restore the original text and color of the buttons
function restoreButtonLabels() {
    if (isConnected) {
        return;
    }
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].querySelector('.warning').style.display = 'none';
        buttons[i].querySelector('.chevron').style.display = 'block';
        buttons[i].querySelector('.button-text').style.display = 'block';
        buttons[i].querySelector('.button-warning').style.display = 'none';
        buttons[i].style.backgroundColor = '';
    }
    isConnected = true;
}

// Instantiate DappToolkit
const rdt = RadixDappToolkit({
    dAppDefinitionAddress: dAppId,
    networkId: RadixNetwork.Stokenet, // network ID 2 is for the stokenet test network 1 is for mainnet
    applicationName: 'Stabilis',
    applicationVersion: '1.0.0',
})
rdt.buttonApi.setTheme('white-with-outline')
rdt.buttonApi.setMode('dark')

// ************ Fetch the user's account address ************
rdt.walletApi.setRequestData(DataRequestBuilder.accounts().exactly(1))

if (window.location.pathname === '/borrow' || window.location.pathname === '/manage-loans') {
    var button = document.querySelector('.dropdown-custom-button');
    var initialWidth = window.getComputedStyle(button).width;
    button.style.minWidth = initialWidth;

    for (let acceptedResource of acceptedResources) {
        let resourceAddress = acceptedResource[1];
        resourceAddresses.push(resourceAddress);
    }

    for (let acceptedResource of acceptedResources) {
        let validatorAddress = acceptedResource[2];
        validatorAddresses.push(validatorAddress);
    }

    let url = "https://stokenet.radixdlt.com/state/entity/details";

    let data = {
        "addresses": resourceAddresses,
        "aggregation_level": "Vault",
        "opt_ins": {
            "ancestor_identities": true,
            "component_royalty_vault_balance": true,
            "package_royalty_vault_balance": true,
            "non_fungible_include_nfids": true,
            "explicit_metadata": []
        }
    };

    let url_2 = "https://stokenet.radixdlt.com/state/validators/list";
    let data_2 = {
        "at_ledger_state": null
    };

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json())
        .then(data => {
            for (let supply of data.items) {
                acceptedResources.forEach(acceptedResource => {
                    if (acceptedResource[1] === supply.address) {
                        acceptedResource[6] = supply.details.total_supply;
                    }
                });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });


    await fetch(url_2, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data_2),
    })
        .then(response => response.json())
        .then(data => {
            let validators = data.validators.items;
            for (let i = 0; i < validators.length; i++) {
                let index = validatorAddresses.indexOf(validators[i].address);
                if (index !== -1) {
                    acceptedResources[index][4] = acceptedResources[index][6] / validators[i].stake_vault.balance;
                    /*if (validators[i].metadata.items[0].key === "icon_url") {
                        acceptedResources[index][3] = validators[i].metadata.items[0].value.typed.value;
                    }
                    else {
                        acceptedResources[index][3] = "images/radix-logo-old.png";
                    }*/
                    //can uncomment once validators have better logos
                }
            }
            console.log(acceptedResources);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function update(onlyWallet) {
    // Subscribe to updates to the user's shared wallet data
    rdt.walletApi.walletData$.subscribe((walletData) => {
        console.log("subscription wallet data: ", walletData)
        if (walletData && walletData.accounts && walletData.accounts.length > 0) {
            accountAddress = walletData.accounts[0].address;
            restoreButtonLabels();
        } else {
            isConnected = false;
            walletStab = 0;
            walletXrd = 0;
            walletLp = 0;
            selectedCdp = undefined;
            selectedMarker = undefined;
            selectedId = undefined;
            accountAddress = "account_tdx_2_129kt8327ulqyq0ahdh74plu0r23qn9jugxppehggtp27m9n063heec"
        }

        async function getFungibleResources(accountAddress) {
            const response = await fetch('https://stokenet.radixdlt.com/state/entity/details', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    addresses: [accountAddress],
                    aggregation_level: 'Vault',
                    opt_ins: {
                        ancestor_identities: true,
                        component_royalty_vault_balance: true,
                        package_royalty_vault_balance: true,
                        non_fungible_include_nfids: true,
                        explicit_metadata: []
                    }
                })
            });

            const data = await response.json();

            // Iterate over each item in the response
            const acceptedFungibleResources = data.items.flatMap(item => {
                // Filter the fungible resources to only include those in the list of accepted resources
                return item.fungible_resources.items.filter(resource => {
                    return acceptedResources.some(acceptedResource => acceptedResource[1] === resource.resource_address);
                }).map(resource => {
                    // Find the corresponding accepted resource
                    const acceptedResource = acceptedResources.find(ar => ar[1] === resource.resource_address);

                    // Add the name of the accepted resource to the resource object
                    resource.name = acceptedResource ? acceptedResource[0] : '';
                    resource.logo = acceptedResource ? acceptedResource[3] : '';
                    resource.multiplier = acceptedResource ? acceptedResource[4] : 1;
                    resource.identifier = acceptedResource ? acceptedResource[5] : '';

                    return resource;
                });
            });

            // Map each object to its name, resource_address and amount properties
            const resourceAddressesAndAmounts = acceptedFungibleResources.map(resource => {
                let amount = 0;
                if (resource.vaults && resource.vaults.items && resource.vaults.items.length > 0) {
                    amount = parseFloat(resource.vaults.items[0].amount);
                }

                return {
                    name: resource.name,
                    resourceAddress: resource.resource_address,
                    amount: amount,
                    logo: resource.logo,
                    multiplier: resource.multiplier,
                    identifier: resource.identifier
                };
            });

            // Sort the array by amount in descending order
            resourceAddressesAndAmounts.sort((a, b) => b.amount - a.amount);

            return resourceAddressesAndAmounts;
        }

        // Define the request URL and parameters
        const url_kvs = "https://stokenet.radixdlt.com/state/key-value-store/data";
        const params_kvs = {
            "key_value_store_address": stakesKvs,
            "keys": [
                { "key_hex": kvsHexes[0] },
                { "key_hex": kvsHexes[1] },
                { "key_json": { "kind": "Tuple", "fields": [{ "kind": "U32", "value": "1" }] } }
            ]
        };

        const url_fetch_ids = "https://stokenet.radixdlt.com/state/entity/details";
        const addresses = [accountAddress, componentAddress, poolComponentAddress, stabAddress, poolAddress, stakingAddress]; // Replace with your addresses

        const requestBody = {
            "addresses": addresses,
            "aggregation_level": "Vault",
            "opt_ins": {
                "ancestor_identities": false,
                "component_royalty_vault_balance": false,
                "package_royalty_vault_balance": false,
                "non_fungible_include_nfids": true,
                "explicit_metadata": [
                    "name",
                    "description"
                ]
            }
        };

        async function fetchData() {
            try {
                // Start both fetch requests
                /*const fetchPromise1 = fetch(url_kvs, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(params_kvs)
                });*/

                const fetchPromise2 = fetch(url_fetch_ids, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestBody)
                });

                // Wait for both fetch requests to complete
                const [/*response1,*/response2] = await Promise.all([/*fetchPromise1, */fetchPromise2]);

                // Check the status of the responses
                if (/*!response1.ok || */!response2.ok) {
                    throw new Error(`HTTP error! status: ${response2.status/*change this shit to 1*/}, ${response2.status}`);
                }

                // Parse the responses as JSON
                const [/*data1, */data2] = await Promise.all([/*response1.json(), */response2.json()]);

                // Extract the reward_amount values
                /*const rewardAmounts = data1.entries
                    .map(entry => entry.value.programmatic_json.fields)
                    .flat()
                    .filter(field => field.field_name === 'reward_amount')
                    .map(field => field.value);

                stakeRewards = rewardAmounts[0];
                lpRewards = rewardAmounts[1];*/

                // Process the second response
                let sortedItems = [];
                addresses.forEach(address => {
                    let item = data2.items.find(item => item.address === address);
                    if (item) {
                        sortedItems.push(item);
                    }
                });

                sortedItems.forEach(item => {
                    if (item.non_fungible_resources) {
                        item.non_fungible_resources.items.forEach(nfrItem => {
                            if (nfrItem.resource_address === stabIdAddress && nfrItem.vaults) {
                                nfrItem.vaults.items.forEach(vault => {
                                    stab_ids = stab_ids.concat(vault.items);
                                });
                            }
                            if (nfrItem.resource_address === cdpAddress && nfrItem.vaults) {
                                nfrItem.vaults.items.forEach(vault => {
                                    cdp_ids = cdp_ids.concat(vault.items);
                                });
                            }
                            if (nfrItem.resource_address === markerAddress && nfrItem.vaults) {
                                nfrItem.vaults.items.forEach(vault => {
                                    marker_ids = marker_ids.concat(vault.items);
                                });
                            }
                        });
                    }
                });

                if (cdp_ids.length > 0) {
                    // Define the data for the request
                    const requestDataCdp = {
                        "resource_address": cdpAddress,
                        "non_fungible_ids": cdp_ids
                    };

                    // Make the API request
                    await fetch('https://stokenet.radixdlt.com/state/non-fungible/data', {
                        method: 'POST', // Specify the HTTP method
                        headers: {
                            'Content-Type': 'application/json', // Set the content type to JSON
                        },
                        body: JSON.stringify(requestDataCdp), // Convert the data to JSON string
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok ' + response.statusText);
                            }
                            return response.json(); // Parse the JSON from the response
                        })
                        .then(data => {
                            sortedItems.push(data.non_fungible_ids); // Write the response data to the console
                        })
                        .catch(error => {
                            console.error('There was a problem with the fetch operation:', error); // Handle any errors
                        });
                }

                return sortedItems;
            } catch (error) {
                console.error('Error:', error);
            }
        }

        function useData(data) {
            stab_ids = []
            cdp_ids = []
            marker_ids = []
            internalPrice = data[1].details.state.fields[12].value;
            xrdPrice = data[1].details.state.fields[19].value;
            stabXrdRatio = internalPrice / xrdPrice;
            validatorMultiplier = 1;
            if (window.location.pathname === '/borrow') {
                let firstOption = true;
                var dropdownContent = document.querySelector('.dropdown-custom-content');
                dropdownContent.innerHTML = '';
                var dropdownButton = document.querySelector('.dropdown-custom-button b');
                var clickableButton = document.querySelector('.dropdown-custom-button');
                getFungibleResources(accountAddress).then(resourceAddressesAndAmounts => {
                    // Add new options
                    resourceAddressesAndAmounts.forEach(resource => {
                        clickableButton.disabled = false;
                        clickableButton.style.backgroundColor = "";
                        // Fetch the name, subtext, and logo
                        var name = resource.name;
                        var address = resource.resourceAddress;
                        var logoUrl = resource.logo;
                        var subtext = 'max. ' + resource.amount.toFixed(2);
                        var slider = document.getElementById('slider-single');
                        let colToUse = document.getElementById("colToUse");

                        if (address === selectedCollateral) {
                            availableCollateral = resource.amount;
                            document.getElementById('col-max').textContent = "max. " + availableCollateral.toFixed(2).toLocaleString('en-US');
                        }

                        // Create a new option
                        var option = document.createElement('div');
                        option.className = 'dropdown-custom-option';
                        option.dataset.logoUrl = logoUrl;
                        option.setAttribute('tabindex', '0'); // Make the option focusable

                        // Add the logo image to the option
                        var logoImage = document.createElement('img');
                        logoImage.src = logoUrl;
                        logoImage.alt = 'Logo';
                        option.appendChild(logoImage);

                        // Add the text to the option
                        var optionText = document.createElement('div');
                        optionText.className = 'option-text';

                        var optionTitle = document.createElement('div');
                        optionTitle.className = 'option-title';
                        optionTitle.textContent = name;
                        optionText.appendChild(optionTitle);

                        var optionSubtext = document.createElement('div');
                        optionSubtext.className = 'option-subtext';
                        optionSubtext.textContent = subtext;
                        optionText.appendChild(optionSubtext);

                        option.appendChild(optionText);

                        // Attach the click event listener
                        option.addEventListener('click', function () {
                            document.getElementById('col-max').textContent = "max. " + resource.amount.toLocaleString('en-US');
                            document.getElementById('col-suffix').textContent = resource.identifier;
                            availableCollateral = resource.amount;
                            selectedCollateral = address;
                            selectedText = resource.identifier;
                            // Remove the 'selected' class from all options
                            validatorMultiplier = resource.multiplier;
                            var options = document.querySelectorAll('.dropdown-custom-option');
                            options.forEach(function (otherOption) {
                                otherOption.classList.remove('selected');
                            });

                            // Add the 'selected' class to the clicked option
                            option.classList.add('selected');

                            // Set the button text to the option title
                            var dropdownButton = document.querySelector('.dropdown-custom-button b');
                            dropdownButton.textContent = name;

                            // Hide the dropdown content
                            var dropdownContent = document.querySelector('.dropdown-custom-content');
                            dropdownContent.style.display = 'none';
                            setChevron(dropdownContent);

                            // Change the logo
                            var logoImage = document.querySelector('.input-logo');
                            logoImage.src = logoUrl;

                            if (colToUse.value !== "") {
                                let result = ((1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100)) * colToUse.value;
                                mintAmount = result;
                                collateralAmount = colToUse.value;
                                document.getElementById("outputStab").innerHTML = customRound(result, 4);
                            } else {
                                let result = (1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100);
                                mintAmount = result;
                                collateralAmount = 0;
                                document.getElementById("outputStab").innerHTML = customRound(result, 4);
                            }

                            if (colToUse.value !== "") {
                                document.getElementById("ratio-suffix").innerHTML = "STAB";
                            }
                            else {
                                document.getElementById("ratio-suffix").innerHTML = "STAB/" + selectedText;
                            }
                            setBorrowButton();
                        });

                        if (firstOption) {
                            option.click();
                            firstOption = false;
                        }

                        // Append the new option to the dropdown content
                        var dropdownContent = document.querySelector('.dropdown-custom-content');
                        dropdownContent.appendChild(option);
                    });
                });

                if (firstOption) {
                    // Fetch the name, subtext, and logo
                    var name = "XRD";
                    var logoUrl = "images/radix-logo.svg";
                    var slider = document.getElementById('slider-single');
                    let colToUse = document.getElementById("colToUse");
                    document.getElementById('col-max').textContent = "max. 0";
                    availableCollateral = 0;
                    selectedCollateral = xrdAddress;
                    selectedText = "XRD";
                    var logoImage = document.querySelector('.input-logo');
                    logoImage.src = logoUrl;
                    var dropdownButton = document.querySelector('.dropdown-custom-button b');
                    dropdownButton.textContent = name;
                    clickableButton.disabled = true;

                    if (colToUse.value !== "") {
                        let result = ((1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100)) * colToUse.value;
                        mintAmount = result;
                        collateralAmount = colToUse.value;
                        document.getElementById("outputStab").innerHTML = customRound(result, 4);
                    } else {
                        let result = (1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100);
                        mintAmount = result;
                        collateralAmount = 0;
                        document.getElementById("outputStab").innerHTML = customRound(result, 4);
                    }

                    if (colToUse.value !== "") {
                        document.getElementById("ratio-suffix").innerHTML = "STAB";
                    }
                    else {
                        document.getElementById("ratio-suffix").innerHTML = "STAB/" + selectedText;
                    }
                }

                if (!isConnected) {
                    var dropdownContent = document.querySelector('.dropdown-custom-content');
                    var dropdownButton = document.querySelector('.dropdown-custom-button b');
                    dropdownContent.innerHTML = '';
                    dropdownButton.textContent = 'XRD';
                    var logoImage = document.querySelector('.input-logo');
                    logoImage.src = 'images/radix-logo.svg';
                    clickableButton.disabled = true;
                }

                setBorrowButton();
            }

            data.forEach(item => {
                if (item.non_fungible_resources) {
                    item.non_fungible_resources.items.forEach(nfrItem => {
                        if (nfrItem.resource_address === stabIdAddress && nfrItem.vaults) {
                            nfrItem.vaults.items.forEach(vault => {
                                stab_ids = stab_ids.concat(vault.items);
                            });
                        }
                        if (nfrItem.resource_address === cdpAddress && nfrItem.vaults) {
                            nfrItem.vaults.items.forEach(vault => {
                                cdp_ids = cdp_ids.concat(vault.items);
                            });
                        }
                        if (nfrItem.resource_address === markerAddress && nfrItem.vaults) {
                            nfrItem.vaults.items.forEach(vault => {
                                marker_ids = marker_ids.concat(vault.items);
                            });
                        }
                    });
                }
            });
            //fix for gov: currentPeriod = data[3].details.state.fields[2].value;
            //fix for gov: let updateRewards = data[1].details.state.fields[30].value;
            walletIlis = getResourceAmount(ilisAddress, data, 0);
            walletXrd = getResourceAmount(xrdAddress, data, 0);
            walletLp = getResourceAmount(lpAddress, data, 0);
            walletStab = getResourceAmount(stabAddress, data, 0);
            xrdPoolAmount = getResourceAmount(xrdAddress, data, 4);
            stabPoolAmount = getResourceAmount(stabAddress, data, 4);
            interestRate = (100 * ((data[1].details.state.fields[14].value ** (24 * 60 * 365)) - 1)).toFixed(2);

            if (window.location.pathname === '/incentives') {
                document.getElementById('ilis-staking-rewards').textContent = stakeRewards + " ILIS/day";
                document.getElementById('lpstab-staking-rewards').textContent = lpRewards + " ILIS/day";
                document.getElementById('update-rewards').textContent = updateRewards + " ILIS/day";
            }

            if (window.location.pathname === '/' || window.location.pathname === '/secret_index' || window.location.pathname === '/index') {
                document.getElementById('interest-rate').textContent = interestRate;
                document.getElementById('circulating-counter').textContent = (1 * data[3].details.total_supply).toFixed(0);
                document.getElementById('price-counter').textContent = (xrdPrice * stabXrdRatio).toFixed(2);
            }

            if (window.location.pathname === '/swap') {
                calculateChange();
                setProvideButton();
                setRemoveLpButton();
                async function fetchData() {
                    try {
                        const response = await fetch('https://stokenet.radixdlt.com/status/gateway-status', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            // Include any necessary body data in string format
                        });
                        const data = await response.json();
                        var now = new Date(data.ledger_state.proposer_round_timestamp);
                    } catch (error) {
                        console.error('Error:', error);
                    }
                    const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000);

                    const entityDetailsUrl = 'https://stokenet.radixdlt.com/state/entity/details';
                    const entityPageUrl = 'https://stokenet.radixdlt.com/state/entity/page/fungibles';
                    const customEntityDetailsUrl = 'https://stokenet.radixdlt.com/state/entity/details';

                    const entityDetailsPayload = (timestamp) => ({
                        addresses: [
                            lpAddress,
                        ],
                        aggregation_level: "Vault",
                        at_ledger_state: {
                            timestamp: timestamp
                        },
                        opt_ins: {
                            ancestor_identities: true,
                            component_royalty_config: true,
                            component_royalty_vault_balance: true,
                            package_royalty_vault_balance: true,
                            non_fungible_include_nfids: true,
                            explicit_metadata: [
                                "name",
                                "description"
                            ]
                        }
                    });

                    const entityPagePayload = (timestamp) => ({
                        address: poolAddress,
                        at_ledger_state: {
                            timestamp: timestamp
                        },
                    });

                    const customEntityDetailsPayload = (timestamp) => ({
                        addresses: [
                            componentAddress
                        ],
                        aggregation_level: "Vault",
                        at_ledger_state: {
                            timestamp: timestamp
                        },
                        opt_ins: {
                            ancestor_identities: true,
                            component_royalty_config: true,
                            component_royalty_vault_balance: true,
                            package_royalty_vault_balance: true,
                            non_fungible_include_nfids: true,
                            explicit_metadata: [
                                "name",
                                "description"
                            ]
                        }
                    });

                    try {
                        const earliestTimestamp = new Date("2024-07-03T03:45:20.702Z");

                        // Determine the timestamp to use
                        const timestampToUse = earliestTimestamp > sevenDaysAgo ? earliestTimestamp : sevenDaysAgo;

                        // Perform API calls with both the chosen timestamp and the current timestamp (now)
                        const [detailsResponse1, pageResponse1, detailsResponse2, pageResponse2, customDetailsResponse] = await Promise.all([
                            fetch(entityDetailsUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(entityDetailsPayload(timestampToUse.toISOString()))
                            }),
                            fetch(entityPageUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(entityPagePayload(timestampToUse.toISOString()))
                            }),
                            fetch(entityDetailsUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(entityDetailsPayload(now.toISOString()))
                            }),
                            fetch(entityPageUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(entityPagePayload(now.toISOString()))
                            }),
                            fetch(customEntityDetailsUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(customEntityDetailsPayload(timestampToUse.toISOString()))
                            })
                        ]);

                        if (!detailsResponse1.ok || !pageResponse1.ok || !detailsResponse2.ok || !pageResponse2.ok || !customDetailsResponse.ok) {
                            throw new Error(`Failed to fetch entity data`);
                        }

                        // Parse responses as JSON
                        const [detailsData1, pageData1, detailsData2, pageData2, customDetailsData] = await Promise.all([
                            detailsResponse1.json(),
                            pageResponse1.json(),
                            detailsResponse2.json(),
                            pageResponse2.json(),
                            customDetailsResponse.json()
                        ]);

                        // Extract amounts and organize by resource_address
                        const amountsMap1 = new Map(pageData1.items.map(item => [item.resource_address, item.amount]));
                        const amountsMap2 = new Map(pageData2.items.map(item => [item.resource_address, item.amount]));

                        // Synchronize the order of amounts based on resource_address
                        const resourceAddresses = pageData1.items.map(item => item.resource_address);
                        const amounts1 = resourceAddresses.map(address => amountsMap1.get(address));
                        const amounts2 = resourceAddresses.map(address => amountsMap2.get(address));

                        // Extract total supply from entity details responses
                        const totalSupply1 = detailsData1.items[0]?.details?.total_supply;
                        const totalSupply2 = detailsData2.items[0]?.details?.total_supply;

                        var xrdInitial = amounts1[0];
                        var stabInitial = amounts1[1];
                        var xrdFinal = amounts2[0];
                        var stabFinal = amounts2[1];
                        var xrdPerStabInitial = xrdInitial / stabInitial;
                        var xrdPerStabFinal = xrdFinal / stabFinal;
                        var xrdPriceInitial = customDetailsData.items[0].details.state.fields[19].value;
                        var stabPriceInitial = xrdPerStabInitial * xrdPriceInitial;
                        var stabPriceFinal = xrdPerStabFinal * xrdPrice;

                        var dollarPerLpInitial = (xrdInitial * xrdPriceInitial + stabInitial * stabPriceInitial) / totalSupply1;
                        var dollarPerLpFinal = (xrdFinal * xrdPrice + stabFinal * stabPriceFinal) / totalSupply2;

                        var dollarPerLpInitial2 = (xrdInitial * xrdPrice + stabInitial * stabPriceFinal) / totalSupply1;
                        var dollarPerLpFinal2 = (xrdFinal * xrdPrice + stabFinal * stabPriceFinal) / totalSupply2;

                        //var dollarPerLpRatio = (Math.pow((dollarPerLpFinal / dollarPerLpInitial), 365 / 7) - 1) * 100;
                        var dollarPerLpRatio2 = (Math.pow((dollarPerLpFinal2 / dollarPerLpInitial2), 365 / 7) - 1) * 100;
                        var apyElement = document.getElementById('apy-real');
                        var liqElement = document.getElementById('pool-liq');
                        xrdPoolAmount = getResourceAmount(xrdAddress, bigData, 4);
                        liqElement.textContent = "$" + Number((xrdPoolAmount * 2 * xrdPrice).toFixed(2)).toLocaleString('en-US');
                        apyElement.textContent = dollarPerLpRatio2.toFixed(2) + "%";
                        apyElement.style.color = dollarPerLpRatio2 > 0 ? 'green' : 'red';

                    } catch (error) {
                        console.error('Error fetching data:', error);
                    }
                }

                fetchData();

                if (sell == true) {
                    formattedWallet = Math.floor(walletXrd * 10) / 10;
                    document.getElementById('swap-sell-amount').textContent = "max. " + formattedWallet.toLocaleString('en-US');
                } else {
                    if (walletStab >= 0.1) {
                        formattedWallet = Math.floor((walletStab) * 10) / 10;
                    } else {
                        formattedWallet = 0;
                    }
                    document.getElementById('swap-sell-amount').textContent = "max. " + formattedWallet.toLocaleString('en-US');
                }
                document.getElementById('internal-price-xrd').innerHTML = stabXrdRatio.toFixed(2) + " XRD";
                document.getElementById('internal-price-usd').innerHTML = "$" + (stabXrdRatio * xrdPrice).toFixed(3);
                document.getElementById('market-price-xrd').innerHTML = (xrdPoolAmount / stabPoolAmount).toFixed(2) + " XRD";
                document.getElementById('market-price-usd').innerHTML = "$" + ((xrdPoolAmount / stabPoolAmount) * xrdPrice).toFixed(3);
                document.getElementById('interest-rate').innerHTML = interestRate + "% APY";
                if (xrdPoolAmount / stabPoolAmount < 0.995 * stabXrdRatio) {
                    document.getElementById("recommendation").innerHTML = `<strong>Market price &lt; Internal price</strong>, sell XRD to arbitrage!`;
                } else if (xrdPoolAmount / stabPoolAmount > 1.005 * stabXrdRatio) {
                    document.getElementById("recommendation").innerHTML = `<strong>Market price &gt; Internal price</strong>, sell STAB to arbitrage!`;
                }
                else {
                    document.getElementById("recommendation").innerHTML = `Price error is within acceptable bounds. Minimal arbitrage opportunities.`;
                }
                document.getElementById('provide-xrd-amount').textContent = "max. " + (Math.floor(walletXrd * 10) / 10).toLocaleString('en-US');
                if (walletStab >= 0.1) {
                    document.getElementById('provide-stab-amount-second').textContent = "max. " + (Math.floor((walletStab) * 10) / 10).toLocaleString('en-US');
                    document.getElementById('provide-stab-amount').textContent = "max. " + (Math.floor((walletStab) * 10) / 10).toLocaleString('en-US');
                } else {
                    document.getElementById('provide-stab-amount-second').textContent = "max. " + 0;
                    document.getElementById('provide-stab-amount').textContent = "max. " + 0;
                }
                document.getElementById('remove-lp-amount').textContent = "max. " + (Math.floor(walletLp * 10) / 10).toLocaleString('en-US');
            }

            if (window.location.pathname === '/liquidations') {
                var dropdownContent = document.querySelector('.dropdown-custom-content');
                dropdownContent.innerHTML = '';
                var marker_exists = false;
                marker_ids.forEach(id => {
                    if (marker_exists == false) {
                        marker_exists = true;
                    }
                    var name = id;
                    var logoUrl = 'images/marker-receipt.png'
                    var subtext = "Stabilis Marker Receipt";

                    // Create a new option
                    var option = document.createElement('div');
                    option.className = 'dropdown-custom-option';
                    option.dataset.logoUrl = logoUrl;
                    option.setAttribute('tabindex', '0'); // Make the option focusable

                    // Add the logo image to the option
                    var logoImage = document.createElement('img');
                    logoImage.src = logoUrl;
                    logoImage.alt = 'Logo';
                    logoImage.style.borderRadius = '0';
                    option.appendChild(logoImage);

                    // Add the text to the option
                    var optionText = document.createElement('div');
                    optionText.className = 'option-text';

                    var optionTitle = document.createElement('div');
                    optionTitle.className = 'option-title';
                    optionTitle.textContent = name;
                    optionText.appendChild(optionTitle);

                    var optionSubtext = document.createElement('div');
                    optionSubtext.className = 'option-subtext';
                    optionSubtext.textContent = subtext;
                    optionText.appendChild(optionSubtext);

                    option.appendChild(optionText);

                    // Attach the click event listener
                    option.addEventListener('click', function () {
                        // Remove the 'selected' class from all options
                        var options = document.querySelectorAll('.dropdown-custom-option');
                        options.forEach(function (otherOption) {
                            otherOption.classList.remove('selected');
                        });

                        // Add the 'selected' class to the clicked option
                        option.classList.add('selected');

                        // Set the button text to the option title
                        var dropdownButton = document.querySelector('.dropdown-custom-button b');
                        dropdownButton.textContent = "Marker " + name;

                        // Hide the dropdown content
                        var dropdownContent = document.querySelector('.dropdown-custom-content');
                        dropdownContent.style.display = 'none';
                        setChevron(dropdownContent);

                        selectedMarker = id;

                        update_liq();
                        setMarkLiqButton();
                        setNoMarkLiqButton();
                    });

                    // Append the new option to the dropdown content
                    var dropdownContent = document.querySelector('.dropdown-custom-content');
                    dropdownContent.appendChild(option);
                });
                var dropdownButton = document.querySelector('.dropdown-custom-button');

                if (marker_exists == false) {
                    dropdownButton.style.backgroundColor = "";
                    dropdownButton.disabled = true;
                } else {
                    dropdownButton.disabled = false;
                    dropdownButton.style.backgroundColor = "";
                }

                if (selectedMarker !== undefined) {
                    update_liq();
                } else {
                    if (isConnected === false) {
                        dropdownContent.innerHTML = '';
                    }
                    var dropdownButton = document.querySelector('.dropdown-custom-button b');
                    dropdownButton.textContent = "select a marker";
                    document.getElementById('liqwithmark').querySelector('.button-text').textContent = "LIQUIDATE";
                    document.getElementById('liqwithmark').style.color = "";
                    document.getElementById('marker-time').textContent = "-";
                    document.getElementById('status').style.color = "";
                    document.getElementById('marker-state').textContent = "-";
                    document.getElementById('marker-state').style.color = "";
                    document.getElementById('status').textContent = "-";
                    document.getElementById('collateralAmount').textContent = "-";
                    document.getElementById('debtAmount').textContent = "-";
                    document.getElementById('cr').textContent = "-";
                }

                checkLiquidation(parseInt(document.getElementById('liq-counter').textContent));
                setNoMarkLiqButton();
            }

            if (window.location.pathname === '/incentives') {
                selectedId = undefined;
                var dropdownContent = document.querySelector('.dropdown-custom-content');
                dropdownContent.innerHTML = '';

                stab_ids.forEach(id => {
                    var name = id;
                    var logoUrl = 'images/staking-id.png'
                    var subtext = "Stabilis Staking ID";

                    // Create a new option
                    var option = document.createElement('div');
                    option.className = 'dropdown-custom-option';
                    option.dataset.logoUrl = logoUrl;
                    option.setAttribute('tabindex', '0'); // Make the option focusable

                    // Add the logo image to the option
                    var logoImage = document.createElement('img');
                    logoImage.src = logoUrl;
                    logoImage.alt = 'Logo';
                    logoImage.style.borderRadius = '0';
                    option.appendChild(logoImage);

                    // Add the text to the option
                    var optionText = document.createElement('div');
                    optionText.className = 'option-text';

                    var optionTitle = document.createElement('div');
                    optionTitle.className = 'option-title';
                    optionTitle.textContent = name;
                    optionText.appendChild(optionTitle);

                    var optionSubtext = document.createElement('div');
                    optionSubtext.className = 'option-subtext';
                    optionSubtext.textContent = subtext;
                    optionText.appendChild(optionSubtext);

                    option.appendChild(optionText);

                    // Attach the click event listener
                    option.addEventListener('click', function () {
                        // Remove the 'selected' class from all options
                        var options = document.querySelectorAll('.dropdown-custom-option');
                        options.forEach(function (otherOption) {
                            otherOption.classList.remove('selected');
                        });

                        // Add the 'selected' class to the clicked option
                        option.classList.add('selected');

                        // Set the button text to the option title
                        var dropdownButton = document.querySelector('.dropdown-custom-button b');
                        dropdownButton.textContent = "ID " + name;

                        // Hide the dropdown content
                        var dropdownContent = document.querySelector('.dropdown-custom-content');
                        dropdownContent.style.display = 'none';
                        setChevron(dropdownContent);

                        selectedId = id;

                        update_id();
                    });

                    // Append the new option to the dropdown content
                    var dropdownContent = document.querySelector('.dropdown-custom-content');
                    dropdownContent.appendChild(option);
                });

                if (selectedId !== undefined) {
                    update_id();
                } else {
                    if (isConnected === false) {
                        dropdownContent.innerHTML = '';
                    }
                    var dropdownButton = document.querySelector('.dropdown-custom-button b');
                    dropdownButton.textContent = "Select ID";
                    document.getElementById('ilisAmountId').textContent = "-";
                    document.getElementById('lpAmountId').textContent = "-";
                    document.getElementById('nextClaim').textContent = "-";
                    let stakeIlisMax = document.getElementById('stake-ilis-amount');
                    stakeIlisMax.textContent = "max. -";
                    var cloneIlis = stakeIlisMax.cloneNode(true);
                    stakeIlisMax.parentNode.replaceChild(cloneIlis, stakeIlisMax);

                    let stakeLpMax = document.getElementById('stake-lp-amount');
                    stakeLpMax.textContent = "max. -";
                    var cloneLp = stakeLpMax.cloneNode(true);
                    stakeLpMax.parentNode.replaceChild(cloneLp, stakeLpMax);

                    let unstakeIlisMax = document.getElementById('unstake-ilis-amount');
                    unstakeIlisMax.textContent = "max. -";
                    var cloneUnstakeIlis = unstakeIlisMax.cloneNode(true);
                    unstakeIlisMax.parentNode.replaceChild(cloneUnstakeIlis, unstakeIlisMax);

                    let unstakeLpMax = document.getElementById('unstake-lp-amount');
                    unstakeLpMax.textContent = "max. -";
                    var cloneUnstakeLp = unstakeLpMax.cloneNode(true);
                    unstakeLpMax.parentNode.replaceChild(cloneUnstakeLp, unstakeLpMax);
                }
            }

            if (window.location.pathname === '/borrow') {
                document.getElementById('interest-rate').textContent = interestRate + "% APY";
                var number1 = (1 * data[3].details.total_supply).toFixed(0);
                document.getElementById('circulating-stab').textContent = Number(number1).toLocaleString('en-US');
                document.getElementById('stab-internal-price').textContent = "$" + (xrdPrice * stabXrdRatio).toFixed(2);
                document.getElementById('stab-market-price').textContent = "$" + (xrdPrice * xrdPoolAmount / stabPoolAmount).toFixed(2);
                var number2 = (data[3].details.total_supply * xrdPrice * xrdPoolAmount / stabPoolAmount).toFixed(0);
                document.getElementById('stab-mc').textContent = "$" + Number(number2).toLocaleString('en-US');

                // Define the request payload
                const requestPayload = {
                    key_value_store_address: collateralsKvs,
                    keys: [
                        {
                            key_hex: xrdKeyHex,
                        },
                        {
                            key_json: {
                                kind: "Tuple",
                                fields: [
                                    {
                                        kind: "U32",
                                        value: "1"
                                    }
                                ]
                            }
                        }
                    ]
                };

                // Make the API request
                fetch('https://stokenet.radixdlt.com/state/key-value-store/data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestPayload)
                })
                    .then(response => response.json())
                    .then(data => {
                        // Extract minted_stab and collateral_amount from the response
                        const entries = data.entries;
                        let mintedStab, collateralAmountInProtocol;

                        entries.forEach(entry => {
                            const fields = entry.value.programmatic_json.fields;

                            fields.forEach(field => {
                                if (field.field_name === "minted_stab") {
                                    mintedStab = field.value;
                                } else if (field.field_name === "collateral_amount") {
                                    collateralAmountInProtocol = field.value;
                                }
                            });
                        });
                        document.getElementById('stab-cr').textContent = (((collateralAmountInProtocol * xrdPrice) / (mintedStab * internalPrice)) * 100).toFixed(2) + "%";
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });

            }

            if (window.location.pathname === '/manage-loans') {
                var dropdownContent = document.querySelector('.dropdown-custom-content');
                dropdownContent.innerHTML = '';
                var cdpExists = false;
                var counter;
                if (data.length > 5) {
                    counter = data[5].length - 1;
                }
                // Get the dropdown element
                cdp_ids.forEach(id => {
                    if (cdpExists == false) {
                        cdpExists = true;
                    }
                    var name = "Receipt " + id;
                    var logoUrl = 'images/receipt.png'
                    while (data[5][counter].is_burned == true && counter > 0) {
                        counter -= 1;
                    }
                    const resource = acceptedResources.find(ar => ar[1] === data[5][counter].data.programmatic_json.fields[0].value);
                    validatorMultiplier = resource[4];
                    var cr = ((data[5][counter].data.programmatic_json.fields[3].value / data[5][counter].data.programmatic_json.fields[4].value) * xrdPrice * 100 / internalPrice / validatorMultiplier);
                    var status = data[5][counter].data.programmatic_json.fields[6].variant_name;

                    if (status != "Liquidated" && status != "ForceLiquidated") {
                        var subtext = status + ", CR: " + (cr * 1).toFixed(2) + "%";
                    } else {
                        var subtext = status;
                    }


                    // Create a new option
                    var option = document.createElement('div');
                    option.className = 'dropdown-custom-option';
                    if (cr < 150 || status === "Marked") {
                        option.classList.add("extrawarning");
                    } else if (cr < 200) {
                        option.classList.add("littlewarning");
                    }
                    option.dataset.logoUrl = logoUrl;
                    option.setAttribute('tabindex', '0'); // Make the option focusable

                    // Add the logo image to the option
                    var logoImage = document.createElement('img');
                    logoImage.src = logoUrl;
                    logoImage.alt = 'Logo';
                    logoImage.style.borderRadius = '0';
                    option.appendChild(logoImage);

                    // Add the text to the option
                    var optionText = document.createElement('div');
                    optionText.className = 'option-text';

                    var optionTitle = document.createElement('div');
                    optionTitle.className = 'option-title';
                    optionTitle.textContent = name;
                    optionText.appendChild(optionTitle);

                    var optionSubtext = document.createElement('div');
                    optionSubtext.className = 'option-subtext';
                    optionSubtext.textContent = subtext;
                    optionText.appendChild(optionSubtext);

                    option.appendChild(optionText);

                    // Attach the click event listener
                    option.addEventListener('click', function () {
                        document.getElementById('amount-to-remove').value = "";
                        // Remove the 'selected' class from all options
                        var options = document.querySelectorAll('.dropdown-custom-option');
                        options.forEach(function (otherOption) {
                            otherOption.classList.remove('selected');
                        });

                        // Add the 'selected' class to the clicked option
                        option.classList.add('selected');

                        // Set the button text to the option title
                        var dropdownButton = document.querySelector('.dropdown-custom-button b');
                        dropdownButton.textContent = name;

                        // Hide the dropdown content
                        var dropdownContent = document.querySelector('.dropdown-custom-content');
                        dropdownContent.style.display = 'none';
                        setChevron(dropdownContent);
                        selectedCdp = id;
                        update_cdp();
                    });

                    // Append the new option to the dropdown content
                    var dropdownContent = document.querySelector('.dropdown-custom-content');
                    dropdownContent.appendChild(option);
                    counter -= 1;
                });

                var dropdownButton = document.querySelector('.dropdown-custom-button');

                if (cdpExists == false) {
                    dropdownButton.style.backgroundColor = "";
                    dropdownButton.disabled = true;
                } else {
                    dropdownButton.disabled = false;
                    dropdownButton.style.backgroundColor = "";
                }

                if (selectedCdp !== undefined) {
                    update_cdp();
                } else {
                    if (isConnected === false) {
                        dropdownContent.innerHTML = '';
                    }
                    var dropdownButton = document.querySelector('.dropdown-custom-button b');
                    dropdownButton.textContent = "select loan receipt";
                    var logoImage = document.querySelector('.input-logo');
                    logoImage.src = 'images/radix-logo.svg';
                    document.getElementById('status').textContent = "-";
                    document.getElementById('collateral').textContent = "-";
                    document.getElementById('collateralAmount').textContent = "";
                    document.getElementById('debtAmount').textContent = "-";
                    document.getElementById('cr').textContent = "-";
                }
                setCloseLoanButton();
                if (addingCollateral) {
                    setAddColButton();
                } else {
                    setRemoveColButton();
                }
                if (addingDebt) {
                    setAddDebtButton();
                }
                else {
                    setRemoveDebtButton();
                }
            }
        }

        fetchData().then(data => {
            bigData = data;
            if (onlyWallet === false) {
                useData(data);
            }
            update_cdp();
            update_liq();
            update_id();
            if (window.location.pathname === '/liquidations') {
                setMarkLiqButton();
                setNoMarkLiqButton();
            }
        }).catch(e => {
            console.error('Error:', e);
        });
    })
}

update(false);

if (window.location.pathname === '/swap') {
    // Get all buttons with the class 'stake-button'
    const buttons = document.querySelectorAll('.stake-button');

    // Add an event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Perform different actions depending on the id of the clicked button
            buttons.forEach(button => button.classList.remove('selected'));
            this.classList.add('selected');
            if (this.id === 'provide-liq-button') {
                document.getElementById('provide-section').style.display = 'block';
                document.getElementById('remove-section').style.display = 'none';
            } else {
                document.getElementById('provide-section').style.display = 'none';
                document.getElementById('remove-section').style.display = 'block';
            }
        });
    });

    let swapMax = document.getElementById('swap-sell-amount');
    let swapReceive = document.getElementById('amount-receive');
    let inputFieldSwap = document.getElementById('amount-sell');
    let inputFieldProvideXrd = document.getElementById('amount-xrd-provide-lp');
    let inputFieldProvideStab = document.getElementById('amount-stab-provide-lp');
    let inputFieldRemoveLp = document.getElementById('amount-remove-lp');

    inputFieldSwap.oninput = function () {
        if (sell == true) {
            formattedWallet = this.value;
            let outputAmount = (parseFloat(stabPoolAmount) * (1 - fee) * formattedWallet)
                / (parseFloat(xrdPoolAmount) + formattedWallet * (1 - fee))
            swapReceive.value = outputAmount.toFixed(5);
            calculateChange();
        }
        else {
            formattedWallet = this.value;
            let outputAmount = (parseFloat(xrdPoolAmount) * (1 - fee) * formattedWallet)
                / (parseFloat(stabPoolAmount) + formattedWallet * (1 - fee))
            swapReceive.value = outputAmount.toFixed(5);
            calculateChange();
        }
    }

    document.getElementById("switch-button").onclick = function () {
        let source1 = document.getElementById("swap-logo-1").getAttribute("src");
        let source2 = document.getElementById("swap-logo-2").getAttribute("src");
        let sell_suffix = document.getElementById("amount-sell-suffix");
        let receive_suffix = document.getElementById("amount-receive-suffix");
        if (sell_suffix.textContent === "XRD" && receive_suffix.textContent === "STAB") {
            sell_suffix.textContent = "STAB";
            receive_suffix.textContent = "XRD";
        } else {
            sell_suffix.textContent = "XRD";
            receive_suffix.textContent = "STAB";
        }
        document.getElementById("swap-logo-1").setAttribute("src", source2);
        document.getElementById("swap-logo-2").setAttribute("src", source1);
        sell = !sell;
        inputFieldSwap.value = "0";
        swapReceive.value = "0";
        if (sell == true) {
            formattedWallet = Math.floor(walletXrd * 10) / 10;
            swapMax.textContent = "max. " + formattedWallet.toLocaleString('en-US');
        } else {
            if (walletStab >= 0.1) {
                formattedWallet = Math.floor((walletStab) * 10) / 10;
            } else {
                formattedWallet = 0;
            }
            swapMax.textContent = "max. " + formattedWallet.toLocaleString('en-US');
        }
        calculateChange();
    }
    swapMax.addEventListener('click', function () {
        if (sell == true) {
            inputFieldSwap.value = walletXrd;
            formattedWallet = Math.floor(walletXrd * 10) / 10;
            let outputAmount = (parseFloat(stabPoolAmount) * (1 - fee) * formattedWallet)
                / (parseFloat(xrdPoolAmount) + formattedWallet * (1 - fee))
            swapReceive.value = outputAmount.toFixed(5);
        }
        else {
            inputFieldSwap.value = walletStab;
            if (walletStab >= 0.1) {
                formattedWallet = Math.floor((walletStab) * 10) / 10;
            } else {
                formattedWallet = 0;
            }

            let outputAmount = (parseFloat(xrdPoolAmount) * (1 - fee) * formattedWallet)
                / (parseFloat(stabPoolAmount) + formattedWallet * (1 - fee))
            swapReceive.value = outputAmount.toFixed(5);
        }
        calculateChange();
    });
    swapMax.style.cursor = "pointer";

    let provideMaxXrd = document.getElementById('provide-xrd-amount');
    let provideMaxStab = document.getElementById('provide-stab-amount');
    let provideMaxStabSecond = document.getElementById('provide-stab-amount-second');
    let removeMaxLp = document.getElementById('remove-lp-amount');
    provideMaxStab.style.cursor = "pointer";
    provideMaxStabSecond.style.cursor = "pointer";
    provideMaxXrd.style.cursor = "pointer";
    removeMaxLp.style.cursor = "pointer";
    provideMaxXrd.addEventListener('click', function () {
        inputFieldProvideXrd.value = walletXrd;
        inputFieldProvideStab.value = inputFieldProvideXrd.value * (stabPoolAmount / xrdPoolAmount);
        setProvideButton();
    });
    provideMaxStab.addEventListener('click', function () {
        inputFieldProvideStab.value = walletStab;
        inputFieldProvideXrd.value = inputFieldProvideStab.value * (xrdPoolAmount / stabPoolAmount);
        setProvideButton();
    });
    provideMaxStabSecond.addEventListener('click', function () {
        inputFieldProvideStab.value = walletStab;
        inputFieldProvideXrd.value = inputFieldProvideStab.value * (xrdPoolAmount / stabPoolAmount);
        setProvideButton();
    });
    removeMaxLp.addEventListener('click', function () {
        inputFieldRemoveLp.value = walletLp;
        setRemoveLpButton();
    });

    inputFieldRemoveLp.oninput = function () {
        setRemoveLpButton();
    }

    inputFieldProvideStab.oninput = function () {
        inputFieldProvideXrd.value = inputFieldProvideStab.value * (xrdPoolAmount / stabPoolAmount);
        if (this.value == "") {
            inputFieldProvideXrd.value = "";
        }
        setProvideButton();
    }
    inputFieldProvideXrd.oninput = function () {
        inputFieldProvideStab.value = inputFieldProvideXrd.value * (stabPoolAmount / xrdPoolAmount);
        if (this.value == "") {
            inputFieldProvideStab.value = "";
        }
        setProvideButton();
    }

    // *********** Swap ***********
    document.getElementById('sell').onclick = async function () {
        update(true);
        if (!isConnected) {
            return;
        }

        if (document.getElementById("amount-sell").value === "") {
            alert("Please enter an amount to swap.");
            return;
        }

        const button = this;
        const buttonText = button.querySelector('.button-text');
        const buttonWaiting = button.querySelector('.button-waiting');
        const spinner = button.querySelector('.spin');
        const angleIcon = button.querySelector('.chevron');
        spinner.style.display = 'inline-block';
        angleIcon.style.display = 'none';
        buttonText.style.display = 'none';
        buttonWaiting.style.display = 'inline-block';
        button.disabled = true;
        button.style.backgroundColor = '#c6c6c6';

        let sellAmount = document.getElementById("amount-sell").value;
        let sellAddress;
        let message;

        if (sell == true) {
            sellAddress = xrdAddress;
            message = "Selling XRD for STAB using the Stabilis Protocol";
        } else {
            sellAddress = stabAddress;
            message = "Selling STAB for XRD using the Stabilis Protocol";
        }

        let manifest = `
                CALL_METHOD
                Address("${accountAddress}")
                "withdraw"    
                Address("${sellAddress}")
                Decimal("${sellAmount}");
                TAKE_ALL_FROM_WORKTOP
                Address("${sellAddress}")
                Bucket("sell");
                CALL_METHOD
                Address("${poolComponentAddress}")
                "swap"
                Bucket("sell");
                CALL_METHOD
                Address("${accountAddress}")
                "deposit_batch"
                Expression("ENTIRE_WORKTOP");
                `
        console.log('Swap manifest: ', manifest)
        toastMe(0, "Swap", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message,
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Swap", 2);
                console.log(result);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                update(false);
            })
            .catch(error => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';

                // Handle the error
                console.error(error);
            });
    }

    // *********** Add liq ***********
    document.getElementById('provide').onclick = async function () {
        update(true);
        if (!isConnected) {
            return;
        }

        if (document.getElementById("amount-xrd-provide-lp").value === "" || document.getElementById("amount-stab-provide-lp").value === "") {
            alert("Please enter an amount to provide.");
            return;
        }

        const button = this;
        const buttonText = button.querySelector('.button-text');
        const buttonWaiting = button.querySelector('.button-waiting');
        const spinner = button.querySelector('.spin');
        const angleIcon = button.querySelector('.chevron');
        spinner.style.display = 'inline-block';
        angleIcon.style.display = 'none';
        buttonText.style.display = 'none';
        buttonWaiting.style.display = 'inline-block';
        button.disabled = true;
        button.style.backgroundColor = '#c6c6c6';

        let provideAmountXrd = document.getElementById("amount-xrd-provide-lp").value;
        let provideAmountStab = document.getElementById("amount-stab-provide-lp").value;
        let manifest = `
    CALL_METHOD
      Address("${accountAddress}") #Primary account 
      "withdraw"
      Address("${xrdAddress}") # XRD address
      Decimal("${provideAmountXrd}");
  
    TAKE_FROM_WORKTOP 
        Address("${xrdAddress}") # XRD address
        Decimal("${provideAmountXrd}") 
        Bucket("xrd_bucket");
      
    CALL_METHOD
        Address("${accountAddress}") #Primary account 
        "withdraw"
        Address("${stabAddress}") # STAB address
        Decimal("${provideAmountStab}");
  
    TAKE_FROM_WORKTOP 
        Address("${stabAddress}") # STAB address
        Decimal("${provideAmountStab}") 
        Bucket("stab_bucket");
  
    CALL_METHOD    
        Address("${poolComponentAddress}") #pool comp address
        "add_liquidity"
        Bucket("stab_bucket")
        Bucket("xrd_bucket");
  
    CALL_METHOD
        Address("${accountAddress}") 
        "deposit_batch"
        Expression("ENTIRE_WORKTOP");
        `
        console.log('add liq manifest: ', manifest)

        toastMe(0, "Liquidity provision request", 1);
        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Adding liquidity to the Stabilis Protocol",
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Liquidity provision", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                update(false);
            })
            .catch(error => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';

                // Handle the error
                console.error(error);
            });
    }

    // *********** Remove liq. ***********
    document.getElementById('remove').onclick = async function () {
        update(true);
        if (!isConnected) {
            return;
        }

        if (document.getElementById("amount-remove-lp").value === "") {
            alert("Please enter an amount to remove.");
            return;
        }

        const button = this;
        const buttonText = button.querySelector('.button-text');
        const buttonWaiting = button.querySelector('.button-waiting');
        const spinner = button.querySelector('.spin');
        const angleIcon = button.querySelector('.chevron');
        spinner.style.display = 'inline-block';
        angleIcon.style.display = 'none';
        buttonText.style.display = 'none';
        buttonWaiting.style.display = 'inline-block';
        button.disabled = true;
        button.style.backgroundColor = '#c6c6c6';

        let removeAmount = document.getElementById("amount-remove-lp").value;
        let manifest = `
    CALL_METHOD
      Address("${accountAddress}") #Primary account 
      "withdraw"
      Address("${lpAddress}") # XRD address
      Decimal("${removeAmount}");
  
    TAKE_FROM_WORKTOP 
        Address("${lpAddress}") # XRD address
        Decimal("${removeAmount}") 
        Bucket("lp_bucket");
  
    CALL_METHOD    
        Address("${poolComponentAddress}") #pool comp address
        "remove_liquidity"
        Bucket("lp_bucket");
  
    CALL_METHOD
        Address("${accountAddress}") 
        "deposit_batch"
        Expression("ENTIRE_WORKTOP");
        `
        console.log('remove liq manifest: ', manifest)
        toastMe(0, "Liquidity removal request", 1);
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Removing liquidity from the Stabilis Protocol",
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Liquidity removal", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                update(false);
            })
            .catch(error => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';

                // Handle the error
                console.error(error);
            });

    }
}

if (window.location.pathname === '/liquidations') {
    // Get all buttons with the class 'stake-button'
    const buttons = document.querySelectorAll('.stake-button');

    // Add an event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Perform different actions depending on the id of the clicked button
            buttons.forEach(button => button.classList.remove('selected'));
            this.classList.add('selected');
            if (this.id === 'with-marker-button') {
                document.getElementById('with-marker-section').style.display = 'block';
                document.getElementById('without-marker-section').style.display = 'none';
            } else {
                document.getElementById('with-marker-section').style.display = 'none';
                document.getElementById('without-marker-section').style.display = 'block';
            }
        });
    });

    var plusSymbolMark = document.getElementById('plus-symbol-mark');
    var minusSymbolMark = document.getElementById('minus-symbol-mark');
    var markCounter = document.getElementById('mark-counter');
    checkMarking(1);
    setNoMarkLiqButton();

    plusSymbolMark.onclick = function () {
        markCounter.textContent = parseInt(markCounter.textContent) + 1;
        minusSymbolMark.disabled = false;
        minusSymbolMark.style.backgroundColor = "";
        checkMarking(parseInt(markCounter.textContent));
    }
    minusSymbolMark.onclick = function () {
        if (parseInt(markCounter.textContent) > 1) {
            markCounter.textContent = parseInt(markCounter.textContent) - 1;
        }
        if (parseInt(markCounter.textContent) == 1) {
            minusSymbolMark.disabled = true;
        }
        checkMarking(parseInt(markCounter.textContent));
    }

    var plusSymbolLiq = document.getElementById('plus-symbol-liq');
    var minusSymbolLiq = document.getElementById('minus-symbol-liq');
    var liqCounter = document.getElementById('liq-counter');
    checkLiquidation(0);

    plusSymbolLiq.onclick = function () {
        liqCounter.textContent = parseInt(liqCounter.textContent) + 1;
        minusSymbolLiq.disabled = false;
        minusSymbolLiq.style.backgroundColor = "";
        checkLiquidation(parseInt(liqCounter.textContent));
        setNoMarkLiqButton();
    }
    minusSymbolLiq.onclick = function () {
        if (parseInt(liqCounter.textContent) > 0) {
            liqCounter.textContent = parseInt(liqCounter.textContent) - 1;
        }
        if (parseInt(liqCounter.textContent) == 0) {
            minusSymbolLiq.disabled = true;
        }
        checkLiquidation(parseInt(liqCounter.textContent));
        setNoMarkLiqButton();
    }

    /*document.getElementById('liq-helper-button').addEventListener('click', function () {
        if (document.getElementById('liq-helper').style.display === '') {
            document.getElementById('liq-helper').style.display = 'none';
            document.getElementById('chevron-down').style.display = '';
            document.getElementById('chevron-up').style.display = 'none';
        } else {
            document.getElementById('liq-helper').style.display = '';
            document.getElementById('chevron-down').style.display = 'none';
            document.getElementById('chevron-up').style.display = '';
        }
    });*/

    var button = document.querySelector('.dropdown-custom-button');
    var initialWidth = window.getComputedStyle(button).width;
    button.style.minWidth = initialWidth;


    // Get the dropdown button and content
    var dropdownButton = document.querySelector('.dropdown-custom-button');
    var dropdownContent = document.querySelector('.dropdown-custom-content');

    // Add click event listeners to each option
    var options = document.querySelectorAll('.dropdown-custom-option');

    // Show the dropdown content when the button is clicked
    dropdownButton.addEventListener('click', function () {
        if (dropdownButton.disabled) {
            return;
        }
        if (dropdownContent !== undefined) {
            var display = dropdownContent.style.display;
            dropdownContent.style.display = display === 'block' ? 'none' : 'block';
            setChevron(dropdownContent);
        }
        var options = document.querySelectorAll('.dropdown-custom-option');

        // Check if there are any options
        if (options.length === 0) {
            // If not, display a message
            alert('No marker receipts available in wallet.');
        }
    });

    document.addEventListener('click', function (event) {
        // Check if the clicked element is the dropdown button or one of the dropdown options
        var isDropdownButton = dropdownButton.contains(event.target);
        var isDropdownOption = Array.from(options).some(function (option) {
            return option.contains(event.target);
        });

        // If the clicked element is not the dropdown button or one of the dropdown options, hide the dropdown content
        if (!isDropdownButton && !isDropdownOption) {
            dropdownContent.style.display = 'none';
            setChevron(dropdownContent);
        }
    });
    // *********** mark ***********
    document.getElementById('mark').onclick = async function () {
        update(true);
        if (!isConnected) {
            return;
        }

        const button = this;
        const buttonText = button.querySelector('.button-text');
        const buttonWaiting = button.querySelector('.button-waiting');
        const spinner = button.querySelector('.spin');
        const angleIcon = button.querySelector('.chevron');
        spinner.style.display = 'inline-block';
        angleIcon.style.display = 'none';
        buttonText.style.display = 'none';
        buttonWaiting.style.display = 'inline-block';
        button.disabled = true;
        button.style.backgroundColor = '#c6c6c6';
        var amount = parseInt(document.getElementById('mark-counter').textContent);

        let manifest = '';

        // Repeat the specified part of the manifest
        const repeatManifest = `
            CALL_METHOD
                Address("${componentAddress}")
                "mark_for_liquidation"
                Address("${xrdAddress}")
                ;
            `;

        for (let i = 0; i < amount; i++) {
            manifest += repeatManifest;
        }

        // Add the remaining part of the manifest
        manifest += `
            CALL_METHOD
                Address("${accountAddress}")
                "deposit_batch"
                Expression("ENTIRE_WORKTOP");
            `;

        console.log('mark manifest: ', manifest)

        toastMe(0, "Marking request", 1);
        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Marking STAB loan for liquidation",
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Marking", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Mint Result: ", result.value);
                update(false);
                checkMarking(parseInt(markCounter.textContent));
            })
            .catch(error => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';

                // Handle the error
                console.error(error);
            });
    }

    // *********** LiquidateWithMarker ***********
    document.getElementById('liqwithmark').onclick = async function () {
        if (!isConnected) {
            return;
        }

        if (selectedMarker === undefined) {
            alert("Please select a marker receipt.");
            return;
        }

        let markerId = selectedMarker;
        let stabAmount = walletStab;
        let manifest;
        let action;

        const button = this;
        const buttonText = button.querySelector('.button-text');
        const buttonWaiting = button.querySelector('.button-waiting');
        const spinner = button.querySelector('.spin');
        const angleIcon = button.querySelector('.chevron');
        spinner.style.display = 'inline-block';
        angleIcon.style.display = 'none';
        buttonText.style.display = 'none';
        buttonWaiting.style.display = 'inline-block';
        button.disabled = true;
        button.style.backgroundColor = '#c6c6c6';
        let message;

        if (markerUsed == false) {
            message = "Liquidating STAB loan with marker";
            action = "Liquidation";
            manifest = `
    CALL_METHOD
      Address("${accountAddress}")
      "create_proof_of_non_fungibles"
      Address("${markerAddress}") #marker resource address
      Array<NonFungibleLocalId>(
        NonFungibleLocalId("${markerId}")
      );
    POP_FROM_AUTH_ZONE
      Proof("marker_proof");
    CALL_METHOD
      Address("${accountAddress}")
      "withdraw"
      Address("${stabAddress}")
      Decimal("${debtAmount}");
    TAKE_ALL_FROM_WORKTOP
      Address("${stabAddress}")
      Bucket("stab");
    CALL_METHOD
      Address("${componentAddress}")
      "liquidate_position_with_marker"
      Proof("marker_proof")
      Bucket("stab");
    CALL_METHOD
      Address("${accountAddress}")
      "deposit_batch"
      Expression("ENTIRE_WORKTOP");
      `
            console.log('liq /w mark manifest: ', manifest)
        } else {
            message = "Burning STAB loan marker";
            action = "Burning marker receipt";
            manifest = `
            CALL_METHOD
      Address("${accountAddress}") #Primary account 
      "withdraw_non_fungibles"
      Address("${markerAddress}") # XRD address
      Array<NonFungibleLocalId>(
        NonFungibleLocalId("${markerId}")
      );
  
    TAKE_NON_FUNGIBLES_FROM_WORKTOP 
        Address("${markerAddress}") # XRD address
        Array<NonFungibleLocalId>(
            NonFungibleLocalId("${markerId}")
          )
        Bucket("marker_bucket");
  
    CALL_METHOD    
        Address("${componentAddress}") #pool comp address
        "burn_marker"
        Bucket("marker_bucket");
      `
            console.log('burn manifest: ', manifest)
        }

        toastMe(0, action, 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message,
            })
            .then(result => {
                if (action == "Burning marker receipt") {
                    selectedMarker = undefined;
                }
                toastMe(result.value.transactionIntentHash, action, 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Mint Result: ", result.value);
                update(false);
                checkMarking(parseInt(document.getElementById('mark-counter').textContent));
                checkLiquidation(parseInt(document.getElementById('liq-counter').textContent));
            })
            .catch(error => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';

                // Handle the error
                console.error(error);
            });
    }

    // *********** LiquidateWithoutMarker next***********
    document.getElementById('liqnextskip').onclick = async function () {
        if (!isConnected) {
            return;
        }

        const button = this;
        const buttonText = button.querySelector('.button-text');
        const buttonWaiting = button.querySelector('.button-waiting');
        const spinner = button.querySelector('.spin');
        const angleIcon = button.querySelector('.chevron');
        spinner.style.display = 'inline-block';
        angleIcon.style.display = 'none';
        buttonText.style.display = 'none';
        buttonWaiting.style.display = 'inline-block';
        button.disabled = true;
        button.style.backgroundColor = '#c6c6c6';

        let skipAmount = parseFloat(document.getElementById("liq-counter").textContent);
        let stabAmount = liqNextStab + 0.000001;

        let manifest = `
    CALL_METHOD
      Address("${accountAddress}")
      "withdraw"
      Address("${stabAddress}")
      Decimal("${stabAmount}");
    TAKE_ALL_FROM_WORKTOP
      Address("${stabAddress}")
      Bucket("stab");
    CALL_METHOD
      Address("${componentAddress}")
      "liquidate_position_without_marker"
      Bucket("stab")
      true
      ${skipAmount}i64
      NonFungibleLocalId("#0#");
    CALL_METHOD
      Address("${accountAddress}")
      "deposit_batch"
      Expression("ENTIRE_WORKTOP");
      `
        console.log('liquidate manifest: ', manifest)
        toastMe(0, "Liquidation request", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Liquidating STAB loan without marker",
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Liquidition", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Mint Result: ", result.value);
                update(false);
                checkMarking(parseInt(document.getElementById('mark-counter').textContent));
                checkLiquidation(parseInt(document.getElementById('liq-counter').textContent));
            })
            .catch(error => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';

                // Handle the error
                console.error(error);
            });
    }
}

if (window.location.pathname === '/incentives') {
    // Get all buttons with the class 'stake-button'
    const buttons = document.querySelectorAll('.stake-button');

    // Add an event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Perform different actions depending on the id of the clicked button
            buttons.forEach(button => button.classList.remove('selected'));
            this.classList.add('selected');
            if (this.id === 'stake-selector') {
                console.log("showing stake section");
                document.getElementById('stake-section').style.display = '';
                document.getElementById('unstake-section').style.display = 'none';
            } else {
                console.log("showing unstake section");
                document.getElementById('stake-section').style.display = 'none';
                document.getElementById('unstake-section').style.display = '';
            }
        });
    });

    // Get the dropdown button and content
    var dropdownButton = document.querySelector('.dropdown-custom-button');
    var dropdownContent = document.querySelector('.dropdown-custom-content');

    // Add click event listeners to each option
    var options = document.querySelectorAll('.dropdown-custom-option');

    // Show the dropdown content when the button is clicked
    dropdownButton.addEventListener('click', function () {
        if (dropdownButton.disabled) {
            return;
        }
        if (dropdownContent !== undefined) {
            var display = dropdownContent.style.display;
            dropdownContent.style.display = display === 'block' ? 'none' : 'block';
            setChevron(dropdownContent);
        }
        var options = document.querySelectorAll('.dropdown-custom-option');

        // Check if there are any options
        if (options.length === 0) {
            // If not, display a message
            alert('No Stabilis Staking ID in wallet. Please create one.');
        }
    });

    document.addEventListener('click', function (event) {
        // Check if the clicked element is the dropdown button or one of the dropdown options
        var isDropdownButton = dropdownButton.contains(event.target);
        var isDropdownOption = Array.from(options).some(function (option) {
            return option.contains(event.target);
        });

        // If the clicked element is not the dropdown button or one of the dropdown options, hide the dropdown content
        if (!isDropdownButton && !isDropdownOption) {
            dropdownContent.style.display = 'none';
            setChevron(dropdownContent);
        }
    });
    // *********** Create ID ***********
    document.getElementById('new-id').onclick = async function () {
        update(true);
        if (!isConnected) {
            return;
        }

        const button = this;
        const buttonText = button.querySelector('.button-text');
        const buttonWaiting = button.querySelector('.button-waiting');
        const spinner = button.querySelector('.spin');
        const angleIcon = button.querySelector('.chevron');
        spinner.style.display = 'inline-block';
        angleIcon.style.display = 'none';
        buttonText.style.display = 'none';
        buttonWaiting.style.display = 'inline-block';
        button.disabled = true;
        button.style.backgroundColor = '#c6c6c6';

        let manifest = `
    CALL_METHOD    
    Address("${componentAddress}") #proxy comp address
    "create_stab_id";
  
  CALL_METHOD
    Address("${accountAddress}") 
    "deposit_batch"
    Expression("ENTIRE_WORKTOP");
      `
        console.log('create id manifest: ', manifest)
        toastMe(0, "ID creation request", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Creating a new Stabilis Staking ID",
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "ID creation", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Mint Result: ", result.value);
                update(false);
                update_id();
            })
            .catch(error => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';

                // Handle the error
                console.error(error);
            });
    }

    // *********** update ***********
    document.getElementById('update').onclick = async function () {
        update(true);
        if (!isConnected) {
            return;
        }

        const button = this;
        const buttonText = button.querySelector('.button-text');
        const buttonWaiting = button.querySelector('.button-waiting');
        const spinner = button.querySelector('.spin');
        const angleIcon = button.querySelector('.chevron');
        spinner.style.display = 'inline-block';
        angleIcon.style.display = 'none';
        buttonText.style.display = 'none';
        buttonWaiting.style.display = 'inline-block';
        button.disabled = true;
        button.style.backgroundColor = '#c6c6c6';

        let manifest = `
    CALL_METHOD
      Address("${componentAddress}")
      "update";
    CALL_METHOD
      Address("${accountAddress}")
      "deposit_batch"
      Expression("ENTIRE_WORKTOP");
      `
        console.log('update manifest: ', manifest)
        toastMe(0, "Protocol update", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Updating Stabilis Protocol",
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Update", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Mint Result: ", result.value);
                update_id();
            })
            .catch(error => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';

                // Handle the error
                console.error(error);
            });
    }

    // *********** Claim ***********
    document.getElementById('claim-button').onclick = async function () {
        update(true);
        if (!isConnected) {
            return;
        }

        const button = this;
        const buttonText = button.querySelector('.button-text');
        const buttonWaiting = button.querySelector('.button-waiting');
        const spinner = button.querySelector('.spin');
        const angleIcon = button.querySelector('.chevron');
        spinner.style.display = 'inline-block';
        angleIcon.style.display = 'none';
        buttonText.style.display = 'none';
        buttonWaiting.style.display = 'inline-block';
        button.disabled = true;
        button.style.backgroundColor = '#c6c6c6';

        let stabId = selectedId;
        let manifest = `
    CALL_METHOD
      Address("${accountAddress}")
      "create_proof_of_non_fungibles"
      Address("${stabIdAddress}")
      Array<NonFungibleLocalId>(
        NonFungibleLocalId("${stabId}")
      );
  
    POP_FROM_AUTH_ZONE
      Proof("id_proof");
  
    CALL_METHOD    
      Address("${componentAddress}")
      "update_id"
      Proof("id_proof")
      false;
  
    CALL_METHOD
      Address("${accountAddress}") 
      "deposit_batch"
      Expression("ENTIRE_WORKTOP");
      `
        console.log('claim manifest: ', manifest)
        toastMe(0, "Reward claim", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Claiming staking rewards from Stabilis Staking ID",
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Reward claim", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Mint Result: ", result.value);
                update_id();
            })
            .catch(error => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';

                // Handle the error
                console.error(error);
            });
    }

    // *********** Stake ***********
    document.getElementById('stake-button').onclick = async function () {
        update(true);
        if (!isConnected) {
            return;
        }
        let stabId = selectedId;
        let lpAmount = document.getElementById('stake-lp-field').value;
        let ilisAmount = document.getElementById('stake-ilis-field').value;
        let manifest;

        const button = this;
        const buttonText = button.querySelector('.button-text');
        const buttonWaiting = button.querySelector('.button-waiting');
        const spinner = button.querySelector('.spin');
        const angleIcon = button.querySelector('.chevron');
        spinner.style.display = 'inline-block';
        angleIcon.style.display = 'none';
        buttonText.style.display = 'none';
        buttonWaiting.style.display = 'inline-block';
        button.disabled = true;
        button.style.backgroundColor = '#c6c6c6';

        if (lpAmount !== "") {
            if (ilisAmount == "") {
                manifest = `
            CALL_METHOD
              Address("${accountAddress}")
              "create_proof_of_non_fungibles"
              Address("${stabIdAddress}")
              Array<NonFungibleLocalId>(
                NonFungibleLocalId("${stabId}")
              );
          
            POP_FROM_AUTH_ZONE
              Proof("id_proof");
          
              CALL_METHOD
              Address("${accountAddress}") #Primary account 
              "withdraw"
              Address("${lpAddress}") # ILIS address
              Decimal("${lpAmount}");
          
            TAKE_FROM_WORKTOP 
                Address("${lpAddress}") # ILIS address
                Decimal("${lpAmount}") 
                Bucket("lp_bucket");
          
            CALL_METHOD    
              Address("${componentAddress}") #proxy comp address
              "stake"
              Bucket("lp_bucket")
              Proof("id_proof");
          
            CALL_METHOD
              Address("${accountAddress}") 
              "deposit_batch"
              Expression("ENTIRE_WORKTOP");
              `
                console.log('stake manifest: ', manifest)
            } else {
                manifest = `
        CALL_METHOD
          Address("${accountAddress}")
          "create_proof_of_non_fungibles"
          Address("${stabIdAddress}")
          Array<NonFungibleLocalId>(
            NonFungibleLocalId("${stabId}")
          );
      
        POP_FROM_AUTH_ZONE
          Proof("id_proof");
      
          CALL_METHOD
          Address("${accountAddress}") #Primary account 
          "withdraw"
          Address("${lpAddress}") # ILIS address
          Decimal("${lpAmount}");
      
        TAKE_FROM_WORKTOP 
            Address("${lpAddress}") # ILIS address
            Decimal("${lpAmount}") 
            Bucket("lp_bucket");
      
        CALL_METHOD    
          Address("${componentAddress}") #proxy comp address
          "stake"
          Bucket("lp_bucket")
          Proof("id_proof");

          CALL_METHOD
              Address("${accountAddress}") #Primary account 
              "withdraw"
              Address("${ilisAddress}") # ILIS address
              Decimal("${ilisAmount}");
          
            TAKE_FROM_WORKTOP 
                Address("${ilisAddress}") # ILIS address
                Decimal("${ilisAmount}") 
                Bucket("ilis_bucket");

                CALL_METHOD
          Address("${accountAddress}")
          "create_proof_of_non_fungibles"
          Address("${stabIdAddress}")
          Array<NonFungibleLocalId>(
            NonFungibleLocalId("${stabId}")
          );
      
        POP_FROM_AUTH_ZONE
          Proof("id_proof_2");
          
            CALL_METHOD    
              Address("${componentAddress}") #proxy comp address
              "stake"
              Bucket("ilis_bucket")
              Proof("id_proof_2");
      
        CALL_METHOD
          Address("${accountAddress}") 
          "deposit_batch"
          Expression("ENTIRE_WORKTOP");
          `
                console.log('stake manifest: ', manifest)
            }
        } else if (ilisAmount !== "") {
            manifest = `
            CALL_METHOD
              Address("${accountAddress}")
              "create_proof_of_non_fungibles"
              Address("${stabIdAddress}")
              Array<NonFungibleLocalId>(
                NonFungibleLocalId("${stabId}")
              );
          
            POP_FROM_AUTH_ZONE
              Proof("id_proof");
          
              CALL_METHOD
              Address("${accountAddress}") #Primary account 
              "withdraw"
              Address("${ilisAddress}") # ILIS address
              Decimal("${ilisAmount}");
          
            TAKE_FROM_WORKTOP 
                Address("${ilisAddress}") # ILIS address
                Decimal("${ilisAmount}") 
                Bucket("ilis_bucket");
          
            CALL_METHOD    
              Address("${componentAddress}") #proxy comp address
              "stake"
              Bucket("ilis_bucket")
              Proof("id_proof");
          
            CALL_METHOD
              Address("${accountAddress}") 
              "deposit_batch"
              Expression("ENTIRE_WORKTOP");
              `
            console.log('stake manifest: ', manifest)
        }
        toastMe(0, "Staking request", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Staking to Stabilis Staking ID",
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Staking", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Mint Result: ", result.value);
                if (lpAmount !== "") {
                    walletLp -= lpAmount;
                }
                if (ilisAmount !== "") {
                    walletIlis -= ilisAmount;
                }
                update_id();
            })
            .catch(error => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';

                // Handle the error
                console.error(error);
            });
    }

    // *********** Unstake ***********
    document.getElementById('unstake-button').onclick = async function () {
        update(true);
        if (!isConnected) {
            return;
        }
        let stabId = selectedId;
        let lpAmount = document.getElementById('unstake-lp-field').value;
        let ilisAmount = document.getElementById('unstake-ilis-field').value;
        let manifest;

        const button = this;
        const buttonText = button.querySelector('.button-text');
        const buttonWaiting = button.querySelector('.button-waiting');
        const spinner = button.querySelector('.spin');
        const angleIcon = button.querySelector('.chevron');
        spinner.style.display = 'inline-block';
        angleIcon.style.display = 'none';
        buttonText.style.display = 'none';
        buttonWaiting.style.display = 'inline-block';
        button.disabled = true;
        button.style.backgroundColor = '#c6c6c6';

        if (lpAmount !== "") {
            if (ilisAmount == "") {
                manifest = `
                CALL_METHOD
                  Address("${accountAddress}")
                  "create_proof_of_non_fungibles"
                  Address("${stabIdAddress}")
                  Array<NonFungibleLocalId>(
                    NonFungibleLocalId("${stabId}")
                  );
              
                POP_FROM_AUTH_ZONE
                  Proof("id_proof");
              
                CALL_METHOD    
                  Address("${componentAddress}") #proxy comp address
                  "unstake"
                  Proof("id_proof")
                  Address("${lpAddress}")
                  Decimal("${lpAmount}")
                  false;
              
                CALL_METHOD
                  Address("${accountAddress}") 
                  "deposit_batch"
                  Expression("ENTIRE_WORKTOP");
                  `
                console.log('unstake manifest: ', manifest)
            } else {
                manifest = `
            CALL_METHOD
              Address("${accountAddress}")
              "create_proof_of_non_fungibles"
              Address("${stabIdAddress}")
              Array<NonFungibleLocalId>(
                NonFungibleLocalId("${stabId}")
              );
          
            POP_FROM_AUTH_ZONE
              Proof("id_proof");
          
              CALL_METHOD    
              Address("${componentAddress}") #proxy comp address
              "unstake"
              Proof("id_proof")
              Address("${lpAddress}")
              Decimal("${lpAmount}")
              false;
    
                    CALL_METHOD
              Address("${accountAddress}")
              "create_proof_of_non_fungibles"
              Address("${stabIdAddress}")
              Array<NonFungibleLocalId>(
                NonFungibleLocalId("${stabId}")
              );
          
            POP_FROM_AUTH_ZONE
              Proof("id_proof_2");
              
              CALL_METHOD    
              Address("${componentAddress}") #proxy comp address
              "unstake"
              Proof("id_proof_2")
              Address("${ilisAddress}")
              Decimal("${ilisAmount}")
              false;
          
            CALL_METHOD
              Address("${accountAddress}") 
              "deposit_batch"
              Expression("ENTIRE_WORKTOP");
              `
                console.log('unstake manifest: ', manifest)
            }
        } else if (ilisAmount !== "") {
            manifest = `
                CALL_METHOD
                  Address("${accountAddress}")
                  "create_proof_of_non_fungibles"
                  Address("${stabIdAddress}")
                  Array<NonFungibleLocalId>(
                    NonFungibleLocalId("${stabId}")
                  );
              
                POP_FROM_AUTH_ZONE
                  Proof("id_proof");
              
                  CALL_METHOD    
                  Address("${componentAddress}") #proxy comp address
                  "unstake"
                  Proof("id_proof")
                  Address("${ilisAddress}")
                  Decimal("${ilisAmount}")
                  false;
              
                CALL_METHOD
                  Address("${accountAddress}") 
                  "deposit_batch"
                  Expression("ENTIRE_WORKTOP");
                  `
            console.log('unstake manifest: ', manifest)
        }

        toastMe(0, "Unstaking request", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Unstaking from Stabilis Staking ID",
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Unstaking", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Mint Result: ", result.value);
                update_id();
            })
            .catch(error => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';

                // Handle the error
                console.error(error);
            });

        if (lpAmount !== "") {
            let lpChange = Math.min(lpAmount, lpAmountId + lpWaitingAmount);
            walletLp += lpChange;
        }
        if (ilisAmount !== "") {
            let ilisChange = Math.min(ilisAmount, ilisAmountId + ilisWaitingAmount);
            walletIlis += ilisChange;
        }
    }

}

if (window.location.pathname === '/manage-loans') {
    setCloseLoanButton();
    if (addingCollateral) {
        setAddColButton();
    } else {
        setRemoveColButton();
    }
    if (addingDebt) {
        setAddDebtButton();
    }
    else {
        setRemoveDebtButton();
    }

    var slider = document.getElementById("slider-col");
    var inputAmount = document.getElementById("amount-to-remove");
    var maxButton = document.getElementById("max-new-cr");
    var sliderDebt = document.getElementById("slider-debt");
    var inputAmountDebt = document.getElementById("amount-to-remove-debt");
    var maxButtonDebt = document.getElementById("max-new-cr-debt");

    slider.oninput = function () {
        if (addingCollateral) {
            newCr = this.value;
            var newCol = Math.max(0, getNecessaryCollateral(debtAmount, this.value / 100, validatorMultiplier) - collateralAmount);
            document.getElementById("new-cr").textContent = "New CR: " + this.value + "%";
            inputAmount.value = Math.min(parseFloat(newCol.toFixed(2)), availableCollateral);
            setAddColButton();
        } else {
            newCr = maxCr - this.value;
            realInputCol = newCr;
            var newCol = Math.max(0, collateralAmount - getNecessaryCollateral(debtAmount, newCr / 100, validatorMultiplier));
            document.getElementById("new-cr").textContent = "New CR: " + newCr.toFixed(2) + "%";
            inputAmount.value = Math.min(parseFloat(newCol.toFixed(2)), (collateralAmount - getNecessaryCollateral(debtAmount, 1.5, validatorMultiplier)));
            setRemoveColButton();
        }

    }

    inputAmount.oninput = function () {
        if (addingCollateral) {
            newCr = getUpToDateCr(parseFloat(this.value) + parseFloat(collateralAmount), debtAmount, validatorMultiplier) * 100;
            document.getElementById("new-cr").textContent = "New CR: " + (newCr).toFixed(2) + "%";
            if (this.value != "") {
                slider.value = newCr;
            } else {
                slider.value = slider.min;
                document.getElementById("new-cr").textContent = "New CR: " + slider.min + "%";
            }
            setAddColButton();
        } else {
            newCr = getUpToDateCr(parseFloat(collateralAmount) - parseFloat(this.value), debtAmount, validatorMultiplier) * 100;
            realInputCol = newCr;
            document.getElementById("new-cr").textContent = "New CR: " + (newCr).toFixed(2) + "%";
            if (this.value != "") {
                slider.value = maxCr - newCr;
                newCr = slider.value;
            } else {
                slider.value = slider.min;
                document.getElementById("new-cr").textContent = "New CR: " + maxCr + "%";
            }
            setRemoveColButton();
        }
        updateSliderBackground(slider);
    }

    maxButton.onclick = function () {
        if (status === "Closed" || status === "Liquidated") {
            return;
        }
        if (addingCollateral) {
            maxCr = Number(maxCr); // Convert maxCr to a number
            newCr = maxCr;
            document.getElementById("new-cr").textContent = "New CR: " + (maxCr * 1).toFixed(2) + "%";
            slider.value = maxCr > 1000 ? 1000 : maxCr;
            inputAmount.value = availableCollateral;
            setAddColButton();
        } else if (status != "Marked") {
            if (newCr < 150) {
                return;
            }
            newCr = 150;
            realInputCol = newCr;
            document.getElementById("new-cr").textContent = "New CR: 150%";
            slider.value = maxCr - 150;
            inputAmount.value = (collateralAmount - getNecessaryCollateral(debtAmount, 1.5, validatorMultiplier));
            setRemoveColButton();
        }
        updateSliderBackground(slider);
    }

    sliderDebt.oninput = function () {
        if (addingDebt == false) {
            newCrDebt = this.value;
            var newStab = Math.max(0, debtAmount - getNecessaryStab(collateralAmount, this.value / 100, validatorMultiplier));
            document.getElementById("new-cr-debt").textContent = "New CR: " + this.value + "%";
            inputAmountDebt.value = Math.min(walletStab, parseFloat(newStab.toFixed(2)));
            setRemoveDebtButton();
        } else {
            newCrDebt = maxCrDebt - this.value;
            realInputDebt = newCrDebt;
            var newDebt = Math.max(0, getNecessaryStab(collateralAmount, newCrDebt / 100, validatorMultiplier) - debtAmount);
            document.getElementById("new-cr-debt").textContent = "New CR: " + newCrDebt.toFixed(2) + "%";
            inputAmountDebt.value = Math.min((getNecessaryStab(collateralAmount, 1.5, validatorMultiplier) - debtAmount), parseFloat(newDebt.toFixed(2)));
            setAddDebtButton();
        }

    }

    inputAmountDebt.oninput = function () {
        if (addingDebt == false) {
            var maxStabToUse = Math.min(debtAmount - 1, walletStab);
            if (this.value > maxStabToUse) {
                this.value = maxStabToUse;
            }
            newCrDebt = getUpToDateCr(parseFloat(collateralAmount), debtAmount - parseFloat(this.value), validatorMultiplier) * 100;
            if (newCrDebt < 0) {
                newCrDebt = 0;
            }
            document.getElementById("new-cr-debt").textContent = "New CR: " + (newCrDebt).toFixed(2) + "%";
            if (this.value != "") {
                sliderDebt.value = newCrDebt;
            } else {
                sliderDebt.value = sliderDebt.min;
                document.getElementById("new-cr-debt").textContent = "New CR: " + sliderDebt.min + "%";
            }
            setRemoveDebtButton();
        } else {
            newCrDebt = getUpToDateCr(parseFloat(collateralAmount), (parseFloat(debtAmount) + parseFloat(this.value)), validatorMultiplier) * 100;
            realInputDebt = newCrDebt;
            console.log(newCrDebt);
            document.getElementById("new-cr-debt").textContent = "New CR: " + (newCrDebt).toFixed(2) + "%";
            if (this.value != "") {
                sliderDebt.value = maxCrDebt - newCrDebt;
                newCrDebt = sliderDebt.value;
            } else {
                sliderDebt.value = sliderDebt.min;
                document.getElementById("new-cr-debt").textContent = "New CR: " + maxCrDebt + "%";
            }
            setAddDebtButton();
        }
        updateSliderBackground(sliderDebt);
    }

    maxButtonDebt.onclick = function () {
        if (status === "Closed" || status === "Liquidated") {
            return;
        }
        if (addingDebt == false) {
            var maxStabToUse = Math.min(debtAmount - 1, walletStab);
            maxCrDebt = Number(maxCrDebt); // Convert maxCr to a number
            newCrDebt = maxCrDebt;
            document.getElementById("new-cr-debt").textContent = "New CR: " + (maxCrDebt * 1).toFixed(2) + "%";
            sliderDebt.value = maxCrDebt > 1000 ? 1000 : maxCrDebt;
            inputAmountDebt.value = maxStabToUse;
            setRemoveDebtButton();
        } else if (status != "Marked") {
            if (newCrDebt < 150) {
                return;
            }
            newCrDebt = 150;
            realInputDebt = newCrDebt;
            document.getElementById("new-cr-debt").textContent = "New CR: 150%";
            sliderDebt.value = maxCr - 150;
            inputAmountDebt.value = (getNecessaryStab(collateralAmount, 1.5, validatorMultiplier) - debtAmount);
            setAddDebtButton();
        }
        updateSliderBackground(sliderDebt);
    }



    var button = document.querySelector('.dropdown-custom-button');
    var initialWidth = window.getComputedStyle(button).width;
    button.style.minWidth = initialWidth;

    // Get the dropdown button and content
    var dropdownButton = document.querySelector('.dropdown-custom-button');
    var dropdownContent = document.querySelector('.dropdown-custom-content');

    // Get all buttons with the class 'stake-button'
    const buttonsCol = document.querySelectorAll('.stake-button.col');
    const buttonsDebt = document.querySelectorAll('.stake-button.debt');

    // Add an event listener to each button
    buttonsCol.forEach(button => {
        button.addEventListener('click', function () {
            // Perform different actions depending on the id of the clicked button
            buttonsCol.forEach(button => button.classList.remove('selected'));
            this.classList.add('selected');
            if (this.id === 'add-collateral-selector') {
                document.getElementById('add-col-button').style.display = '';
                document.getElementById('remove-col-button').style.display = 'none';
                addingCollateral = true;
            } else if (this.id === 'remove-collateral-selector') {
                document.getElementById('add-col-button').style.display = 'none';
                document.getElementById('remove-col-button').style.display = '';
                addingCollateral = false;
            }
            update_cdp();
        });
    });

    buttonsDebt.forEach(button => {
        button.addEventListener('click', function () {
            // Perform different actions depending on the id of the clicked button
            buttonsDebt.forEach(button => button.classList.remove('selected'));
            this.classList.add('selected');
            if (this.id === 'add-debt-selector') {
                document.getElementById('add-debt-button').style.display = 'none';
                document.getElementById('remove-debt-button').style.display = '';
                addingDebt = true;
            } else if (this.id === 'remove-debt-selector') {
                document.getElementById('add-debt-button').style.display = '';
                document.getElementById('remove-debt-button').style.display = 'none';
                addingDebt = false;
            }
            update_cdp();
        });
    });

    // Add click event listeners to each option
    var options = document.querySelectorAll('.dropdown-custom-option');

    // Show the dropdown content when the button is clicked
    dropdownButton.addEventListener('click', function () {
        if (dropdownButton.disabled) {
            return;
        }
        if (dropdownContent !== undefined) {
            var display = dropdownContent.style.display;
            dropdownContent.style.display = display === 'block' ? 'none' : 'block';
            setChevron(dropdownContent);
        }
        var options = document.querySelectorAll('.dropdown-custom-option');

        // Check if there are any options
        if (options.length === 0) {
            // If not, display a message
            alert('No loan receipts in wallet.');
        }
    });

    document.addEventListener('click', function (event) {
        // Check if the clicked element is the dropdown button or one of the dropdown options
        var isDropdownButton = dropdownButton.contains(event.target);
        var isDropdownOption = Array.from(options).some(function (option) {
            return option.contains(event.target);
        });

        // If the clicked element is not the dropdown button or one of the dropdown options, hide the dropdown content
        if (!isDropdownButton && !isDropdownOption) {
            dropdownContent.style.display = 'none';
            setChevron(dropdownContent);
        }
    });
    // *********** Top up CDP ***********
    document.getElementById('add-col-button').onclick = async function () {
        if (!isConnected) {
            return;
        }

        if (selectedCdp === undefined) {
            alert("Please select a loan receipt.");
            return;
        }

        if (document.getElementById('amount-to-remove').value === "") {
            alert("Please enter an amount to add.");
            return;
        }

        const button = this;
        const buttonText = button.querySelector('.button-text');
        const buttonWaiting = button.querySelector('.button-waiting');
        const spinner = button.querySelector('.spin');
        const angleIcon = button.querySelector('.chevron');
        spinner.style.display = 'inline-block';
        angleIcon.style.display = 'none';
        buttonText.style.display = 'none';
        buttonWaiting.style.display = 'inline-block';
        button.disabled = true;
        button.style.backgroundColor = '#c6c6c6';

        let cdpId = selectedCdp;
        let collateralAmount = document.getElementById('amount-to-remove').value;
        let collateralAddress = resourceAddress;
        let manifest = `
          CALL_METHOD
          Address("${accountAddress}")
          "create_proof_of_non_fungibles"
          Address("${cdpAddress}")
          Array<NonFungibleLocalId>(
            NonFungibleLocalId("${cdpId}")
          );
         
        POP_FROM_AUTH_ZONE
          Proof("cdp_proof");
         
        CALL_METHOD
          Address("${accountAddress}") #Primary account 
          "withdraw"
          Address("${collateralAddress}") # Collateral address
          Decimal("${collateralAmount}");
         
        TAKE_FROM_WORKTOP 
            Address("${collateralAddress}") # Collateral address
            Decimal("${collateralAmount}") 
            Bucket("xrd_bucket");
         
        CALL_METHOD    
          Address("${componentAddress}")
          "top_up_cdp"
          Proof("cdp_proof")
          Bucket("xrd_bucket");
          `

        console.log('top up manifest: ', manifest)

        toastMe(0, "Collateral addition", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Adding collateral to STAB loan",
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Collateral addition", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Mint Result: ", result.value);
                update(false);
            })
            .catch(error => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';

                // Handle the error
                console.error(error);
            });
    }

    // *********** Remove collateral CDP ***********
    document.getElementById('remove-col-button').onclick = async function () {
        if (!isConnected) {
            return;
        }

        if (selectedCdp === undefined) {
            alert("Please select a loan receipt.");
            return;
        }

        if (document.getElementById('amount-to-remove').value === "") {
            alert("Please enter an amount to add.");
            return;
        }

        const button = this;
        const buttonText = button.querySelector('.button-text');
        const buttonWaiting = button.querySelector('.button-waiting');
        const spinner = button.querySelector('.spin');
        const angleIcon = button.querySelector('.chevron');
        spinner.style.display = 'inline-block';
        angleIcon.style.display = 'none';
        buttonText.style.display = 'none';
        buttonWaiting.style.display = 'inline-block';
        button.disabled = true;
        button.style.backgroundColor = '#c6c6c6';

        let cdpId = selectedCdp;
        let collateralAmount = document.getElementById('amount-to-remove').value;
        let manifest = `
        CALL_METHOD
          Address("${accountAddress}")
          "create_proof_of_non_fungibles"
          Address("${cdpAddress}")
          Array<NonFungibleLocalId>(
            NonFungibleLocalId("${cdpId}")
          );
         
        POP_FROM_AUTH_ZONE
          Proof("cdp_proof");
         
        CALL_METHOD    
          Address("${componentAddress}")
          "remove_collateral"
          Proof("cdp_proof")
          Decimal("${collateralAmount}");
         
        CALL_METHOD
          Address("${accountAddress}") 
          "deposit_batch"
          Expression("ENTIRE_WORKTOP");
          `
        console.log('remove col. manifest: ', manifest)
        toastMe(0, "Collateral removal", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Removing collateral from STAB loan",
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Collateral removal", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Mint Result: ", result.value);
                update(false);
            })
            .catch(error => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';

                // Handle the error
                console.error(error);
            });
    }

    // *********** Remove debt CDP ***********
    document.getElementById('add-debt-button').onclick = async function () {
        if (!isConnected) {
            return;
        }

        if (selectedCdp === undefined) {
            alert("Please select a loan receipt.");
            return;
        }

        if (document.getElementById('amount-to-remove-debt').value === "") {
            alert("Please enter an amount to add.");
            return;
        }

        const button = this;
        const buttonText = button.querySelector('.button-text');
        const buttonWaiting = button.querySelector('.button-waiting');
        const spinner = button.querySelector('.spin');
        const angleIcon = button.querySelector('.chevron');
        spinner.style.display = 'inline-block';
        angleIcon.style.display = 'none';
        buttonText.style.display = 'none';
        buttonWaiting.style.display = 'inline-block';
        button.disabled = true;
        button.style.backgroundColor = '#c6c6c6';

        let cdpId = selectedCdp;
        let collateralAmount = document.getElementById('amount-to-remove-debt').value;
        let manifest = `
        CALL_METHOD
          Address("${accountAddress}")
          "create_proof_of_non_fungibles"
          Address("${cdpAddress}")
          Array<NonFungibleLocalId>(
            NonFungibleLocalId("${cdpId}")
          );
         
        POP_FROM_AUTH_ZONE
          Proof("cdp_proof");

        CALL_METHOD
          Address("${accountAddress}")
          "withdraw"
          Address("${stabAddress}")
          Decimal("${collateralAmount}")
        ;

        TAKE_ALL_FROM_WORKTOP
          Address("${stabAddress}")
          Bucket("stab")
        ;
         
        CALL_METHOD    
          Address("${componentAddress}")
          "partial_close_cdp"
          Proof("cdp_proof")
          Bucket("stab");
         
        CALL_METHOD
          Address("${accountAddress}") 
          "deposit_batch"
          Expression("ENTIRE_WORKTOP");
          `
        console.log('remove debt. manifest: ', manifest)
        toastMe(0, "Partial debt pay off", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Partially paying off STAB debt",
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Partial debt pay off", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Mint Result: ", result.value);
                update(false);
            })
            .catch(error => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';

                // Handle the error
                console.error(error);
            });
    }

    // *********** Add debt CDP ***********
    document.getElementById('remove-debt-button').onclick = async function () {
        if (!isConnected) {
            return;
        }

        if (selectedCdp === undefined) {
            alert("Please select a loan receipt.");
            return;
        }

        if (document.getElementById('amount-to-remove-debt').value === "") {
            alert("Please enter an amount to add.");
            return;
        }

        const button = this;
        const buttonText = button.querySelector('.button-text');
        const buttonWaiting = button.querySelector('.button-waiting');
        const spinner = button.querySelector('.spin');
        const angleIcon = button.querySelector('.chevron');
        spinner.style.display = 'inline-block';
        angleIcon.style.display = 'none';
        buttonText.style.display = 'none';
        buttonWaiting.style.display = 'inline-block';
        button.disabled = true;
        button.style.backgroundColor = '#c6c6c6';

        let cdpId = selectedCdp;
        let collateralAmount = document.getElementById('amount-to-remove-debt').value;
        let manifest = `
        CALL_METHOD
          Address("${accountAddress}")
          "create_proof_of_non_fungibles"
          Address("${cdpAddress}")
          Array<NonFungibleLocalId>(
            NonFungibleLocalId("${cdpId}")
          );
         
        POP_FROM_AUTH_ZONE
          Proof("cdp_proof");
         
        CALL_METHOD    
          Address("${componentAddress}")
          "borrow_more"
          Proof("cdp_proof")
          Decimal("${collateralAmount}");
         
        CALL_METHOD
          Address("${accountAddress}") 
          "deposit_batch"
          Expression("ENTIRE_WORKTOP");
          `
        console.log('add debt. manifest: ', manifest)
        toastMe(0, "Borrow more from loan receipt", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Borrowing more STAB",
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Borrowing more from loan receipt", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Mint Result: ", result.value);
                update(false);
            })
            .catch(error => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';

                // Handle the error
                console.error(error);
            });
    }

    // *********** Close CDP ***********
    document.getElementById('close-entire-button').onclick = async function () {
        if (!isConnected) {
            return;
        }

        if (selectedCdp === undefined) {
            alert("Please select a loan receipt.");
            return;
        }

        if (status === "Marked") {
            alert("Please save loan before closing.");
            return;
        }

        const button = this;
        const buttonText = button.querySelector('.button-text');
        const buttonWaiting = button.querySelector('.button-waiting');
        const spinner = button.querySelector('.spin');
        const angleIcon = button.querySelector('.chevron');
        spinner.style.display = 'inline-block';
        angleIcon.style.display = 'none';
        buttonText.style.display = 'none';
        buttonWaiting.style.display = 'inline-block';
        button.disabled = true;
        button.style.backgroundColor = '#c6c6c6';

        let cdpId = selectedCdp;

        if (status == "Closed" || collateralAmount == 0) {
            let manifest = `
            CALL_METHOD
                Address("${accountAddress}") #Primary account 
                "withdraw_non_fungibles"
                Address("${cdpAddress}") # XRD address
                Array<NonFungibleLocalId>(
                    NonFungibleLocalId("${cdpId}")
                );
            
                TAKE_NON_FUNGIBLES_FROM_WORKTOP 
                    Address("${cdpAddress}") # XRD address
                    Array<NonFungibleLocalId>(
                        NonFungibleLocalId("${cdpId}")
                    )
                    Bucket("receipt_bucket");
            
                CALL_METHOD    
                    Address("${componentAddress}") #pool comp address
                    "burn_loan_receipt"
                    Bucket("receipt_bucket");
                `
            console.log('burn receipt manifest: ', manifest)
            toastMe(0, "Burning loan receipt", 1);

            // Send manifest to extension for signing
            rdt.walletApi
                .sendTransaction({
                    transactionManifest: manifest,
                    version: 1,
                    message: "Burning STAB loan receipt",
                })
                .then(result => {
                    if (status == "Closed" || collateralAmount == 0) {
                        selectedCdp = undefined;
                    }
                    toastMe(result.value.transactionIntentHash, "Burning loan receipt", 2);
                    // Hide the spinner, show the angle icon, and change the button text back
                    spinner.style.display = 'none';
                    angleIcon.style.display = 'inline-block';
                    buttonText.style.display = 'inline-block';
                    buttonWaiting.style.display = 'none';
                    button.disabled = false;
                    button.style.backgroundColor = '';
                    console.log("Mint Result: ", result.value);
                    update_cdp();
                    update(false);
                })
                .catch(error => {
                    // Hide the spinner, show the angle icon, and change the button text back
                    spinner.style.display = 'none';
                    angleIcon.style.display = 'inline-block';
                    buttonText.style.display = 'inline-block';
                    buttonWaiting.style.display = 'none';
                    button.disabled = false;
                    button.style.backgroundColor = '';

                    // Handle the error
                    console.error(error);
                });

        } else if (status == "Liquidated" || status == "ForceLiquidated") {
            let manifest = `
            CALL_METHOD
              Address("${accountAddress}")
              "create_proof_of_non_fungibles"
              Address("${cdpAddress}")
              Array<NonFungibleLocalId>(
                NonFungibleLocalId("${cdpId}")
              );
             
            POP_FROM_AUTH_ZONE
              Proof("cdp_proof");
             
            CALL_METHOD    
              Address("${componentAddress}")
              "retrieve_leftover_collateral"
              Proof("cdp_proof");
             
            CALL_METHOD
              Address("${accountAddress}") 
              "deposit_batch"
              Expression("ENTIRE_WORKTOP");
              `
            console.log('retrieve col. manifest: ', manifest)
            toastMe(0, "Collateral retrieval", 1);

            // Send manifest to extension for signing
            rdt.walletApi
                .sendTransaction({
                    transactionManifest: manifest,
                    version: 1,
                    message: "Retrieving leftover collateral from STAB loan",
                })
                .then(result => {
                    toastMe(result.value.transactionIntentHash, "Collateral retrieval", 2);
                    // Hide the spinner, show the angle icon, and change the button text back
                    spinner.style.display = 'none';
                    angleIcon.style.display = 'inline-block';
                    buttonText.style.display = 'inline-block';
                    buttonWaiting.style.display = 'none';
                    button.disabled = false;
                    button.style.backgroundColor = '';
                    console.log("Mint Result: ", result.value);
                    update_cdp();
                })
                .catch(error => {
                    // Hide the spinner, show the angle icon, and change the button text back
                    spinner.style.display = 'none';
                    angleIcon.style.display = 'inline-block';
                    buttonText.style.display = 'inline-block';
                    buttonWaiting.style.display = 'none';
                    button.disabled = false;
                    button.style.backgroundColor = '';

                    // Handle the error
                    console.error(error);
                });

        } else {

            let stabAmount = debtAmount;
            let manifest = `
            CALL_METHOD
              Address("${accountAddress}")
              "create_proof_of_non_fungibles"
              Address("${cdpAddress}")
              Array<NonFungibleLocalId>(
                NonFungibleLocalId("${cdpId}")
              );
             
            POP_FROM_AUTH_ZONE
              Proof("cdp_proof");
             
            CALL_METHOD
              Address("${accountAddress}") #Primary account 
              "withdraw"
              Address("${stabAddress}") # Collateral address
              Decimal("${stabAmount}");
             
            TAKE_FROM_WORKTOP 
                Address("${stabAddress}") # Collateral address
                Decimal("${stabAmount}") 
                Bucket("repayment_bucket");
             
            CALL_METHOD    
              Address("${componentAddress}")
              "close_cdp"
              Proof("cdp_proof")
              Bucket("repayment_bucket");
             
            CALL_METHOD
              Address("${accountAddress}") 
              "deposit_batch"
              Expression("ENTIRE_WORKTOP");
              `
            console.log('Close cdp manifest: ', manifest)
            toastMe(0, "Loan close request", 1);

            // Send manifest to extension for signing
            rdt.walletApi
                .sendTransaction({
                    transactionManifest: manifest,
                    version: 1,
                    message: "Closing STAB loan",
                })
                .then(result => {
                    toastMe(result.value.transactionIntentHash, "Closing loan", 2);
                    // Hide the spinner, show the angle icon, and change the button text back
                    spinner.style.display = 'none';
                    angleIcon.style.display = 'inline-block';
                    buttonText.style.display = 'inline-block';
                    buttonWaiting.style.display = 'none';
                    button.disabled = false;
                    button.style.backgroundColor = '';
                    console.log("Mint Result: ", result.value);
                    update_cdp();
                    update(true);
                })
                .catch(error => {
                    // Hide the spinner, show the angle icon, and change the button text back
                    spinner.style.display = 'none';
                    angleIcon.style.display = 'inline-block';
                    buttonText.style.display = 'inline-block';
                    buttonWaiting.style.display = 'none';
                    button.disabled = false;
                    button.style.backgroundColor = '';

                    // Handle the error
                    console.error(error);
                });
        }
    }
}
if (window.location.pathname === '/borrow') {
    document.getElementById('warning-low-ratio').addEventListener('click', function () {
        setChevronNoButton(document.getElementById('warning-low-ratio'));
    });
    document.getElementById('warning-good-ratio').addEventListener('click', function () {
        setChevronNoButton(document.getElementById('warning-good-ratio'));
    });
    let colMax = document.getElementById('col-max');
    colMax.addEventListener('click', function () {
        collateralAmount = availableCollateral;
        if (selectedCollateral !== undefined) {
            document.getElementById("colToUse").value = Math.floor(availableCollateral * 100) / 100;
            let result = ((1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100)) * Math.floor(availableCollateral * 100) / 100;
            mintAmount = result;
            collateralAmount = Math.floor(availableCollateral * 100) / 100;
            document.getElementById("outputStab").innerHTML = customRound(result, 4);
            document.getElementById("ratio-suffix").innerHTML = "STAB";
        }
        setBorrowButton();
    });
    colMax.style.cursor = "pointer";

    var slider = document.getElementById('slider-single');
    var plus = document.getElementById('plus-button');
    var minus = document.getElementById('minus-button');
    var h2 = document.getElementById('colRatioStab');
    let colToUse = document.getElementById("colToUse");
    // Display the default slider value

    // Update the slider background on input change
    slider.addEventListener('input', function () {
        const value = this.value;
        // Calculate the percentage of the thumb position
        const percentage = (value - this.min) / (this.max - this.min) * 100;
        // Update the slider background style
        this.style.background = `linear-gradient(to right, #1BA9A0 0%, #2B6CCC ${percentage}%, #f2f2f2 ${percentage}%)`;
    });

    // Initialize the slider background
    slider.dispatchEvent(new Event('input'));

    // Get the dropdown button and content
    var dropdownButton = document.querySelector('.dropdown-custom-button');
    var dropdownContent = document.querySelector('.dropdown-custom-content');

    // Add click event listeners to each option
    var options = document.querySelectorAll('.dropdown-custom-option');

    // Show the dropdown content when the button is clicked
    dropdownButton.addEventListener('click', function () {
        if (dropdownButton.disabled) {
            return;
        }
        if (dropdownContent !== undefined) {
            var display = dropdownContent.style.display;
            dropdownContent.style.display = display === 'block' ? 'none' : 'block';
            setChevron(dropdownContent);
        }
        if (!isConnected) {
            alert('Connect wallet.');
        }
    });

    document.addEventListener('click', function (event) {
        // Check if the clicked element is the dropdown button or one of the dropdown options
        var isDropdownButton = dropdownButton.contains(event.target);
        var isDropdownOption = Array.from(options).some(function (option) {
            return option.contains(event.target);
        });

        // If the clicked element is not the dropdown button or one of the dropdown options, hide the dropdown content
        if (!isDropdownButton && !isDropdownOption) {
            dropdownContent.style.display = 'none';
            setChevron(dropdownContent);
        }
    });

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
        h2.textContent = slider.value + "%";
        if (selectedCollateral !== undefined) {
            if (colToUse.value !== "") {
                let result = ((1 / (stabXrdRatio * validatorMultiplier)) / (this.value / 100)) * colToUse.value;
                mintAmount = result;
                collateralAmount = colToUse.value;
                document.getElementById("outputStab").innerHTML = customRound(result, 4);
            } else {
                let result = (1 / (stabXrdRatio * validatorMultiplier)) / (this.value / 100);
                mintAmount = result;
                collateralAmount = 0;
                document.getElementById("outputStab").innerHTML = customRound(result, 4);
            }
            setBorrowButton();
        }
        if (this.value >= 200) {
            document.getElementById('warning-low-ratio').style.display = 'none';
            document.getElementById('warning-good-ratio').style.display = '';
        } else if (this.value >= 150) {
            document.getElementById('warning-low-ratio').style.display = '';
            document.getElementById('warning-good-ratio').style.display = 'none';
        } else {
            document.getElementById('warning-low-ratio').style.display = 'none';
            document.getElementById('warning-good-ratio').style.display = 'none';
        }
    }

    plus.onclick = function () {
        slider.value = parseInt(slider.value) + 1;
        h2.textContent = slider.value + "%";
        if (selectedCollateral !== undefined) {
            if (colToUse.value !== "") {
                let result = ((1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100)) * colToUse.value;
                mintAmount = result;
                collateralAmount = colToUse.value;
                document.getElementById("outputStab").innerHTML = customRound(result, 4);
            } else {
                let result = (1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100) * 1;
                mintAmount = result;
                collateralAmount = 0;
                document.getElementById("outputStab").innerHTML = customRound(result, 4);
            }
            setBorrowButton();
        }

        if (slider.value >= 200) {
            document.getElementById('warning-low-ratio').style.display = 'none';
            document.getElementById('warning-good-ratio').style.display = '';
        } else if (slider.value >= 150) {
            document.getElementById('warning-low-ratio').style.display = '';
            document.getElementById('warning-good-ratio').style.display = 'none';
        } else {
            document.getElementById('warning-low-ratio').style.display = 'none';
            document.getElementById('warning-good-ratio').style.display = 'none';
        }
    }

    minus.onclick = function () {
        slider.value = parseInt(slider.value) - 1;
        h2.textContent = slider.value + "%";
        if (selectedCollateral !== undefined) {
            if (colToUse.value !== "") {
                let result = ((1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100)) * colToUse.value;
                mintAmount = result;
                collateralAmount = colToUse.value;
                document.getElementById("outputStab").innerHTML = customRound(result, 4);
            } else {
                let result = (1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100) * 1;
                mintAmount = result;
                collateralAmount = 0;
                document.getElementById("outputStab").innerHTML = customRound(result, 4);
            }
            setBorrowButton();
        }

        if (slider.value >= 200) {
            document.getElementById('warning-low-ratio').style.display = 'none';
            document.getElementById('warning-good-ratio').style.display = '';
        } else if (slider.value >= 150) {
            document.getElementById('warning-low-ratio').style.display = '';
            document.getElementById('warning-good-ratio').style.display = 'none';
        } else {
            document.getElementById('warning-low-ratio').style.display = 'none';
            document.getElementById('warning-good-ratio').style.display = 'none';
        }
    }

    document.getElementById("colToUse").oninput = function () {
        h2.textContent = slider.value + "%";
        if (selectedCollateral !== undefined) {
            if (this.value !== "") {
                let result = ((1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100)) * this.value;
                mintAmount = result;
                collateralAmount = this.value;
                document.getElementById("outputStab").innerHTML = customRound(result, 4);
            } else {
                let result = (1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100) * 1;
                mintAmount = result;
                collateralAmount = 0;
                document.getElementById("outputStab").innerHTML = customRound(result, 4);
            }
            setBorrowButton();
        }

        if (colToUse.value !== "") {
            document.getElementById("ratio-suffix").innerHTML = "STAB";
        }
        else {
            document.getElementById("ratio-suffix").innerHTML = "STAB/" + selectedText;
        }
    }

    // *********** Mint safe ***********
    document.getElementById('mint-button').onclick = async function () {
        update(true);
        if (!isConnected) {
            return;
        }

        if (selectedCollateral === undefined) {
            alert("Please select a collateral type.");
            return;
        }

        if (document.getElementById("colToUse").value === "") {
            alert("Please enter the amount of collateral to use.");
            return;
        }

        const button = this;
        const buttonText = button.querySelector('.button-text');
        const buttonWaiting = button.querySelector('.button-waiting');
        const spinner = button.querySelector('.spin');
        const angleIcon = button.querySelector('.chevron');
        spinner.style.display = 'inline-block';
        angleIcon.style.display = 'none';
        buttonText.style.display = 'none';
        buttonWaiting.style.display = 'inline-block';
        button.disabled = true;
        button.style.backgroundColor = '#c6c6c6';

        let manifest;
        console.log(idSupplied);
        manifest = `
    CALL_METHOD
    Address("${accountAddress}")
    "withdraw"    
    Address("${selectedCollateral}")
    Decimal("${collateralAmount}");
    TAKE_ALL_FROM_WORKTOP
    Address("${selectedCollateral}")
    Bucket("collateral");
    CALL_METHOD
    Address("${componentAddress}")
    "open_cdp"
    Bucket("collateral")
    Decimal("${mintAmount}")
    false;
    CALL_METHOD
    Address("${accountAddress}")
    "deposit_batch"
    Expression("ENTIRE_WORKTOP");
    `
        console.log('Mint manifest: ', manifest)
        toastMe(0, "Borrow request", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Borrowing STAB through a loan",
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Borrowing", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                update(false);
            })
            .catch(error => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';

                // Handle the error
                console.error(error);
            });
    }
}

if (window.location.pathname === '/lbp') {
    // Example Data: [time, [XRD amount, ILIS amount]]
    const lbpLength = 7;

    const initialData = [
        [0, [555.6, 1000]],
        [0.05, [700, 950]],
        [0.1, [900, 900]],
        [0.2, [1100, 700]],
        [0.23, [1100, 700]],
    ];
    const dataExtrapolated = [
        [1, initialData[initialData.length - 1][1]],
    ];
    const cutoffPoint = (initialData[initialData.length - 1][0]) * lbpLength;
    const data = initialData.concat(dataExtrapolated);

    // Initial and final weights
    const initialWeightILIS = 0.99;
    const finalWeightILIS = 0.50;
    const totalWeightChange = initialWeightILIS - finalWeightILIS;

    // Function to calculate the weight at a given time (partial progress interpolation)
    function calculateWeight(startWeightILIS, endWeightILIS, progress) {
        return startWeightILIS - progress * (startWeightILIS - endWeightILIS);
    }

    // Function to calculate price XRD/ILIS at each data point
    function calculatePrice(xrd, ilis, weightILIS) {
        const weightXRD = 1 - weightILIS;
        return (xrd / ilis) * (weightILIS / weightXRD);
    }

    // Function to interpolate prices between two points based on weights
    function interpolateBetweenPoints(start, end, startWeightILIS, endWeightILIS, numSteps) {
        const [startTime, [startXRD, startILIS]] = start;
        const [endTime, [endXRD, endILIS]] = end;
        const interpolatedData = [];

        for (let step = 0; step <= numSteps; step++) {
            const t = step / numSteps;
            const time = startTime + t * (endTime - startTime);

            // Gradual weight change between the start and end weight (corrected)
            const weightILIS = calculateWeight(startWeightILIS, endWeightILIS, t);

            // Use the XRD and ILIS amounts from the start of the segment
            const price = calculatePrice(startXRD, startILIS, weightILIS);

            interpolatedData.push({ time, price });
        }

        return interpolatedData;
    }

    // Generate interpolated price data
    function generatePriceData(data) {
        const priceData = [];
        let currentWeightILIS = initialWeightILIS;

        for (let i = 0; i < data.length - 1; i++) {
            // Calculate how much the weight should change in this interval
            const progress = data[i + 1][0] - data[i][0]; // Time difference
            var numStepsBetweenPoints = Math.round(1008 * progress);
            console.log(numStepsBetweenPoints);
            const nextWeightILIS = currentWeightILIS - progress * totalWeightChange;

            // Interpolate between two points
            const interpolatedSegment = interpolateBetweenPoints(data[i], data[i + 1], currentWeightILIS, nextWeightILIS, numStepsBetweenPoints);
            priceData.push(...interpolatedSegment);

            // Add the exact time point (price jump) at the next point
            const [nextTime, [nextXRD, nextILIS]] = data[i + 1];
            const weightILIS = nextWeightILIS; // At this time, the weight jumps to the next
            const nextPrice = calculatePrice(nextXRD, nextILIS, weightILIS);
            priceData.push({ time: nextTime, price: nextPrice });

            // Update the starting weight for the next interval
            currentWeightILIS = nextWeightILIS;
        }

        return priceData;
    }

    function createDataPoints(times, prices) {
        return times.map((time, index) => ({
            x: time,
            y: prices[index]
        }));
    }

    // Generate data with interpolation (e.g., 50 steps between each key point)
    const interpolatedData = generatePriceData(data);
    const extrapolatedData = generatePriceData(dataExtrapolated);

    // Extract time and price data for the chart
    const timeValues = interpolatedData.map(d => d.time);
    const timeValuesMultiplied = timeValues.map(value => value * lbpLength);
    const priceValues = interpolatedData.map(d => d.price);
    const extrapolatedIndices = timeValuesMultiplied.map((value, index) => value > cutoffPoint ? index : -1).filter(index => index !== -1);
    const extrapolatedPriceValues = extrapolatedIndices.map(index => priceValues[index]);
    const extrapolatedTimeValues = extrapolatedIndices.map(index => timeValuesMultiplied[index]);
    const remainingTimeValues = timeValuesMultiplied.filter((value, index) => !extrapolatedIndices.includes(index));
    const remainingPriceValues = priceValues.filter((value, index) => !extrapolatedIndices.includes(index));

    const dataset1Data = createDataPoints(remainingTimeValues, remainingPriceValues);
    const dataset2Data = createDataPoints(extrapolatedTimeValues, extrapolatedPriceValues);

    // Create a chart using Chart.js
    const ctx = document.getElementById('myChart').getContext('2d');
    const realChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Real price',
                    data: dataset1Data,  // Use transformed data for the first dataset
                    borderColor: 'rgba(27, 169, 160, 1)',
                    backgroundColor: 'rgba(27, 169, 160, 0.2)',
                    fill: true,
                    tension: 0.4, // Smooth curves
                    borderWidth: 2
                },
                {
                    label: 'Extrapolated price',
                    data: dataset2Data,  // Use transformed data for the second dataset
                    borderColor: 'rgba(22, 22, 22, 1)', // Different color for the new dataset
                    backgroundColor: 'rgba(22, 22, 22, 0)', // Different background color
                    fill: false,
                    tension: 0.4, // Smooth curves
                    borderWidth: 2
                }
            ]
        },
        options: {
            scales: {
                x: {
                    type: 'linear',  // Use linear scale for the x-axis
                    title: {
                        display: true,
                        text: 'Time (days from start)',
                        color: 'white'  // Change x-axis title color to white
                    },
                    min: 0, // Minimum value for x-axis
                    max: 7, // Maximum value for x-axis
                    ticks: {
                        color: 'white'  // Change x-axis ticks color to white
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Price (XRD/ILIS)',
                        color: 'white'  // Change y-axis title color to white
                    },
                    ticks: {
                        color: 'white'  // Change y-axis ticks color to white
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white'  // Change legend text color to white
                    }
                },
                tooltip: {
                    callbacks: {
                        title: function (tooltipItems) {
                            // Replace commas with dots and parse as a float, then format with a dot for decimals
                            const xValue = parseFloat(tooltipItems[0].label.replace(',', '.')).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 4 });
                            return xValue + ' days from start';
                        },
                        label: function (tooltipItem) {
                            // Round y-value to 4 decimal points and format with dot for decimals
                            const roundedY = tooltipItem.raw.y.toFixed(4);
                            return tooltipItem.dataset.label + ': ' + roundedY + ' XRD/ILIS';
                        }
                    }
                }
            }
        }
    });


}