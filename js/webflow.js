import { RadixDappToolkit, DataRequestBuilder, RadixNetwork } from '@radixdlt/radix-dapp-toolkit'
// You can create a dApp definition in the dev console at https://stokenet-console.radixdlt.com/dapp-metadata 
// then use that account for your dAppId

const dAppId = 'account_tdx_2_12yjctk8r4csusav9c7z9a7j9vahmnnhnht5ym2ffngh9rqyajsgsdd'
let stabIdAddress = "resource_tdx_2_1ngnptx4ly75dwcv2knf6cp957qfjjprsz90kc8qmqh4ttamj4a2as3" //still need
let componentAddress = "component_tdx_2_1cqeh8j4wgyezttn969kf0c7644m0cc33c0jpfsc9zf770rnpg69y4z"
let poolComponentAddress = "component_tdx_2_1cp6hegmzx90e6ndhruq6kaucqkk39y045jm2xhd00cu0hgh2ategk2"
let poolAddress = "pool_tdx_2_1c5as5t4ymlpnr634eluv2s2l7tv4avgrnvu2ednmwlgmc3ytv0lukg"
let stabAddress = "resource_tdx_2_1t5fksgjt4cf7ru2jfarlvtk3lz33yp48jwqw0u3vxlc70m20nlrxfs"
let cdpAddress = "resource_tdx_2_1ng08wj8qq35zl74uxgxpl9yu2fr3mrqxxr7x3nyrvptffds6tekerh"
let xrdAddress = "resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc"
let ilisAddress = "resource_tdx_2_1t4tsw7n2d0yfs27myw7x5khx00an2lwnvdsj9tyhkv3l8xvgn7mxdc" //still need
let lpAddress = "resource_tdx_2_1t58kwzu5fc0ucqfkk6vm0smr3rw4uax0mmskyzkkdsq2jj0538htv0"
let liqAddress = "resource_tdx_2_1ngtmz07wp3mkzt4f7m2fjm0fwqvzzhe9ha39ysdlrw5qqwu2v7us0f"
let markerAddress = "resource_tdx_2_1nt8dz29mh8pjgte9gx5992qczsykj27cvckrlycv3pj66ykyxhg2we"
let stakingAddress = "component_tdx_2_1cp3k6zm5xqgx0wcf0qtcndjzlxvpusdfpm4eq4838wuswn5h66j8px" // still need
let accountAddress = "account_tdx_2_129kt8327ulqyq0ahdh74plu0r23qn9jugxppehggtp27m9n063heec"
let stakesKvs = "internal_keyvaluestore_tdx_2_1kzphr34g06wgtygn5eppvtavyt4qptp4xn9y0uzwgdesh324zrl7yu" // still need
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

let resourceAddresses = []
let validatorAddresses = []

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

                resourceAddress = data2.non_fungible_ids[0].data.programmatic_json.fields[0].value;
                parentAddress = data2.non_fungible_ids[0].data.programmatic_json.fields[1].value;
                collateralAmount = data2.non_fungible_ids[0].data.programmatic_json.fields[3].value;
                debtAmount = data2.non_fungible_ids[0].data.programmatic_json.fields[4].value;
                cr = data2.non_fungible_ids[0].data.programmatic_json.fields[5].value;
                status = data2.non_fungible_ids[0].data.programmatic_json.fields[6].variant_name;

                let collateralName = getResourceName(resourceAddress);
                document.getElementById('status').textContent = status;
                if (collateralName == "XRD") {
                    document.getElementById('collateralAmount').textContent = (1 * collateralAmount).toFixed(2) + " XRD";
                } else {
                    document.getElementById('collateralAmount').textContent = (1 * collateralAmount).toFixed(2) + " LSUs";
                }
                document.getElementById('debtAmount').textContent = (1 * debtAmount).toFixed(2) + " STAB";
                if (markerUsed == true) {
                    document.getElementById('marker-state').style.color = 'red';
                    document.getElementById('marker-state').textContent = "Expired";
                    document.getElementById('collateralAmount').textContent = "-";
                    document.getElementById('liqwithmark').value = "Burn marker";
                    document.getElementById('liqwithmark').style.backgroundColor = "black";
                    document.getElementById('liqwithmark').style.color = "white";
                } else {
                    document.getElementById('liqwithmark').value = "Liquidate";
                    document.getElementById('liqwithmark').style.backgroundColor = "#999999";
                    document.getElementById('liqwithmark').style.color = "black";
                    document.getElementById('marker-state').style.color = 'green';
                    document.getElementById('marker-state').textContent = "Useable";
                }
                document.getElementById('marker-time').textContent = markerDate;
                document.getElementById('cr').textContent = (cr * xrdPrice * 100).toFixed(2) + "%";

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
            } catch (error) {
                console.error('Error:', error);
            }
        })(); // Immediately invoke the async function
    }
}

async function update_cdp() {

    if (window.location.pathname === '/manage-loans') {
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
                collateralAmount = data.non_fungible_ids[0].data.programmatic_json.fields[3].value;
                debtAmount = data.non_fungible_ids[0].data.programmatic_json.fields[4].value;
                cr = data.non_fungible_ids[0].data.programmatic_json.fields[5].value;
                status = data.non_fungible_ids[0].data.programmatic_json.fields[6].variant_name;

                acceptedResources.forEach(acceptedResource => {
                    if (acceptedResource[1] === resourceAddress) {
                        var logoImage = document.querySelector('.stab-logo');
                        logoImage.src = acceptedResource[3];
                    }
                });
            })
            .catch(error => console.error('Error:', error));

        let collateralName = getResourceName(resourceAddress);
        document.getElementById('status').textContent = status;
        document.getElementById('collateral').textContent = collateralName;
        if (collateralName == "XRD") {
            document.getElementById('collateralAmount').textContent = (1 * collateralAmount).toFixed(2) + " XRD";
        } else {
            document.getElementById('collateralAmount').textContent = (1 * collateralAmount).toFixed(2) + " LSUs";
        }
        document.getElementById('debtAmount').textContent = (1 * debtAmount).toFixed(2) + " STAB";
        document.getElementById('cr').textContent = (cr * xrdPrice * 100).toFixed(2) + "%";

        if (status == "Liquidated" || status == "ForceLiquidated") {
            document.getElementById('status').style.color = 'red';
            document.getElementById('debtAmount').textContent = "-";
            document.getElementById('cr').textContent = "-";
        } else if (status == "Marked") {
            document.getElementById('status').style.color = '#ef7200';
        }
        else if (status == "Closed") {
            document.getElementById('status').style.color = 'black';
            document.getElementById('debtAmount').textContent = "-";
            document.getElementById('cr').textContent = "-";
            document.getElementById('collateralAmount').textContent = "-";
        } else if (status == "Healthy") {
            document.getElementById('status').style.color = 'green';
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
        update(true);
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
    applicationName: 'Radix Gumball dApp',
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

    if (window.location.pathname === '/borrow') {

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

    }

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
            console.log(validators);
            for (let i = 0; i < validators.length; i++) {
                let index = validatorAddresses.indexOf(validators[i].address);
                if (index !== -1) {
                    console.log(i);
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
        }

        if (onlyWallet === false) {
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
            const addresses = [accountAddress, componentAddress, poolComponentAddress, stakingAddress, stabAddress, poolAddress]; // Replace with your addresses

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
                    getFungibleResources(accountAddress).then(resourceAddressesAndAmounts => {
                        var dropdownContent = document.querySelector('.dropdown-custom-content');
                        dropdownContent.innerHTML = '';

                        // Add new options
                        resourceAddressesAndAmounts.forEach(resource => {
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
                                var logoImage = document.querySelector('.stab-logo');
                                logoImage.src = logoUrl;

                                if (colToUse.value !== "") {
                                    let result = ((1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100)) * colToUse.value;
                                    collateralAmount = colToUse.value;
                                    document.getElementById("outputStab").innerHTML = customRound(result, 4);
                                } else {
                                    let result = (1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100);
                                    collateralAmount = 0;
                                    document.getElementById("outputStab").innerHTML = customRound(result, 4);
                                }

                                if (colToUse.value !== "") {
                                    document.getElementById("ratio-suffix").innerHTML = "STAB";
                                }
                                else {
                                    document.getElementById("ratio-suffix").innerHTML = "STAB/" + selectedText;
                                }
                            });

                            // Append the new option to the dropdown content
                            var dropdownContent = document.querySelector('.dropdown-custom-content');
                            dropdownContent.appendChild(option);
                        });
                    });

                    if (!isConnected) {
                        var dropdownContent = document.querySelector('.dropdown-custom-content');
                        var dropdownButton = document.querySelector('.dropdown-custom-button b');
                        dropdownContent.innerHTML = '';
                        dropdownButton.textContent = 'select collateral';
                        var logoImage = document.querySelector('.stab-logo');
                        logoImage.src = 'images/radix-logo.svg';
                    }
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
                console.log(data);
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
                    if (sell == true) {
                        formattedWallet = Math.floor(walletXrd * 10) / 10;
                        document.getElementById('swap-sell-amount').textContent = "max. " + formattedWallet.toLocaleString('en-US');
                    } else {
                        if (walletStab >= 0.1) {
                            formattedWallet = Math.floor((walletStab - 0.1) * 10) / 10;
                        } else {
                            formattedWallet = 0;
                        }
                        document.getElementById('swap-sell-amount').textContent = "max. " + formattedWallet.toLocaleString('en-US');
                    }
                    document.getElementById('internal-price-xrd').innerHTML = stabXrdRatio.toFixed(2) + " XRD";
                    document.getElementById('internal-price-usd').innerHTML = "$" + (stabXrdRatio * xrdPrice).toFixed(2);
                    document.getElementById('market-price-xrd').innerHTML = (xrdPoolAmount / stabPoolAmount).toFixed(2) + " XRD";
                    document.getElementById('market-price-usd').innerHTML = "$" + ((xrdPoolAmount / stabPoolAmount) * xrdPrice).toFixed(2);
                    document.getElementById('interest-rate').innerHTML = interestRate + "%/year";
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
                        document.getElementById('provide-stab-amount').textContent = "max. " + (Math.floor((walletStab - 0.1) * 10) / 10).toLocaleString('en-US');
                    } else {
                        document.getElementById('provide-stab-amount').textContent = "max. " + 0;
                    }
                    document.getElementById('remove-lp-amount').textContent = "max. " + (Math.floor(walletLp * 10) / 10).toLocaleString('en-US');
                }

                if (window.location.pathname === '/liquidations') {
                    selectedMarker = undefined;
                    var dropdownContent = document.querySelector('.dropdown-custom-content');
                    dropdownContent.innerHTML = '';
                    marker_ids.forEach(id => {
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
                        });

                        // Append the new option to the dropdown content
                        var dropdownContent = document.querySelector('.dropdown-custom-content');
                        dropdownContent.appendChild(option);
                    });

                    if (selectedId !== undefined) {
                        update_liq();
                    } else {
                        if (isConnected === false) {
                            dropdownContent.innerHTML = '';
                        }
                        var dropdownButton = document.querySelector('.dropdown-custom-button b');
                        dropdownButton.textContent = "select a marker";
                        document.getElementById('marker-time').textContent = "-";
                        document.getElementById('marker-state').textContent = "-";
                        document.getElementById('status').textContent = "-";
                        document.getElementById('collateralAmount').textContent = "-";
                        document.getElementById('debtAmount').textContent = "-";
                        document.getElementById('cr').textContent = "-";
                    }
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

                if (window.location.pathname === '/borrow' || window.location.pathname === '/manage-loans') {
                    document.getElementById('interest-rate').textContent = interestRate + "%";
                    document.getElementById('circulating-stab').textContent = (1 * data[3].details.total_supply).toFixed(0);
                    document.getElementById('stab-internal-price').textContent = "$" + (xrdPrice * stabXrdRatio).toFixed(2);
                    document.getElementById('stab-market-price').textContent = "$" + (xrdPrice * xrdPoolAmount / stabPoolAmount).toFixed(2);
                }

                if (window.location.pathname === '/manage-loans') {
                    selectedCdp = undefined;
                    var dropdownContent = document.querySelector('.dropdown-custom-content');
                    dropdownContent.innerHTML = '';

                    // Get the dropdown element
                    cdp_ids.forEach(id => {
                        var name = id;
                        var logoUrl = 'images/receipt.png'
                        var subtext = "Stabilis Loan Receipt";

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
                            dropdownButton.textContent = "Receipt " + name;

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
                    });
                    if (selectedCdp !== undefined) {
                        update_cdp();
                    } else {
                        if (isConnected === false) {
                            dropdownContent.innerHTML = '';
                        }
                        var dropdownButton = document.querySelector('.dropdown-custom-button b');
                        dropdownButton.textContent = "select loan receipt";
                        var logoImage = document.querySelector('.stab-logo');
                        logoImage.src = 'images/radix-logo.svg';
                        document.getElementById('status').textContent = "-";
                        document.getElementById('collateral').textContent = "-";
                        document.getElementById('collateralAmount').textContent = "-";
                        document.getElementById('debtAmount').textContent = "-";
                        document.getElementById('cr').textContent = "-";
                    }
                }
            }

            fetchData().then(data => {
                useData(data);
            }).catch(e => {
                console.error('Error:', e);
            });
        }
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
            swapReceive.value = outputAmount.toFixed(2);
        }
        else {
            formattedWallet = this.value;
            let outputAmount = (parseFloat(xrdPoolAmount) * (1 - fee) * formattedWallet)
                / (parseFloat(stabPoolAmount) + formattedWallet * (1 - fee))
            swapReceive.value = outputAmount.toFixed(2);
        }
    }

    document.getElementById("switch-button").onclick = function () {
        let source1 = document.getElementById("swap-logo-1").getAttribute("src");
        let source2 = document.getElementById("swap-logo-2").getAttribute("src");
        document.getElementById("swap-logo-1").setAttribute("src", source2);
        document.getElementById("swap-logo-2").setAttribute("src", source1);
        sell = !sell;
        inputFieldSwap.value = "";
        swapReceive.value = "";
        if (sell == true) {
            formattedWallet = Math.floor(walletXrd * 10) / 10;
            swapMax.textContent = "max. " + formattedWallet.toLocaleString('en-US');
        } else {
            if (walletStab >= 0.1) {
                formattedWallet = Math.floor((walletStab - 0.1) * 10) / 10;
            } else {
                formattedWallet = 0;
            }
            swapMax.textContent = "max. " + formattedWallet.toLocaleString('en-US');
        }
    }
    swapMax.addEventListener('click', function () {
        if (sell == true) {
            formattedWallet = Math.floor(walletXrd * 10) / 10;
            let outputAmount = (parseFloat(stabPoolAmount) * (1 - fee) * formattedWallet)
                / (parseFloat(xrdPoolAmount) + formattedWallet * (1 - fee))
            swapReceive.value = outputAmount.toFixed(2);
        }
        else {
            if (walletStab >= 0.1) {
                formattedWallet = Math.floor((walletStab - 0.1) * 10) / 10;
            } else {
                formattedWallet = 0;
            }

            let outputAmount = (parseFloat(xrdPoolAmount) * (1 - fee) * formattedWallet)
                / (parseFloat(stabPoolAmount) + formattedWallet * (1 - fee))
            swapReceive.value = outputAmount.toFixed(2);
        }
        inputFieldSwap.value = formattedWallet;
    });
    swapMax.style.cursor = "pointer";

    let provideMaxXrd = document.getElementById('provide-xrd-amount');
    let provideMaxStab = document.getElementById('provide-stab-amount');
    let removeMaxLp = document.getElementById('remove-lp-amount');
    provideMaxStab.style.cursor = "pointer";
    provideMaxXrd.style.cursor = "pointer";
    removeMaxLp.style.cursor = "pointer";
    provideMaxXrd.addEventListener('click', function () {
        inputFieldProvideXrd.value = Math.floor(walletXrd * 10) / 10;
        inputFieldProvideStab.value = (inputFieldProvideXrd.value * (stabPoolAmount / xrdPoolAmount)).toFixed(1);
    });
    provideMaxStab.addEventListener('click', function () {
        inputFieldProvideStab.value = (Math.floor((walletStab - 0.1) * 10) / 10).toLocaleString('en-US');
        inputFieldProvideXrd.value = (inputFieldProvideStab.value * (xrdPoolAmount / stabPoolAmount)).toFixed(1);
    });
    removeMaxLp.addEventListener('click', function () {
        inputFieldRemoveLp.value = Math.floor(walletLp * 10) / 10;
    });

    inputFieldProvideStab.oninput = function () {
        inputFieldProvideXrd.value = (inputFieldProvideStab.value * (xrdPoolAmount / stabPoolAmount)).toFixed(1);
        if (this.value == "") {
            inputFieldProvideXrd.value = "";
        }
    }
    inputFieldProvideXrd.oninput = function () {
        inputFieldProvideStab.value = (inputFieldProvideXrd.value * (stabPoolAmount / xrdPoolAmount)).toFixed(1);
        if (this.value == "") {
            inputFieldProvideStab.value = "";
        }
    }

    // *********** Swap ***********
    document.getElementById('sell').onclick = async function () {
        update(true);
        if (!isConnected) {
            return;
        }

        console.log('Sell button clicked');

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

        if (sell == true) {
            sellAddress = xrdAddress;
        } else {
            sellAddress = stabAddress;
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

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
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

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
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

        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
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

        let manifest = `
    CALL_METHOD
      Address("${componentAddress}")
      "mark_for_liquidation"
      Address("${xrdAddress}");
    CALL_METHOD
      Address("${accountAddress}")
      "deposit_batch"
      Expression("ENTIRE_WORKTOP");
      `
        console.log('mark manifest: ', manifest)

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
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

    // *********** LiquidateWithMarker ***********
    document.getElementById('liqwithmark').onclick = async function () {
        update(true);
        if (!isConnected) {
            return;
        }
        let markerId = selectedMarker;
        let stabAmount = walletStab;
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

        if (markerUsed == false) {
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

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Mint Result: ", result.value);
                update_liq();
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
    document.getElementById('liqnext').onclick = async function () {
        update(true);
        if (!isConnected) {
            return;
        }
        let skipAmount = 1;
        let stabAmount = walletStab;

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
        console.log('liq w/o mark manifest: ', manifest)

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Mint Result: ", result.value);
                update_liq();
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

        let skipAmount;

        if (document.getElementById("amount-to-skip").value == "0") {
            skipAmount = 1;
        }
        else {
            skipAmount = document.getElementById("amount-to-skip").value + 1;
        }

        let stabAmount = walletStab;

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

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Mint Result: ", result.value);
                update_liq();
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

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
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

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
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

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
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

    // *********** Claim with restake ***********
    document.getElementById('claim-button-restake').onclick = async function () {
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
      true;
  
    CALL_METHOD
      Address("${accountAddress}") 
      "deposit_batch"
      Expression("ENTIRE_WORKTOP");
      `
        console.log('claim manifest: ', manifest)

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
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

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
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

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
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
    var button = document.querySelector('.dropdown-custom-button');
    var initialWidth = window.getComputedStyle(button).width;
    button.style.minWidth = initialWidth;

    // Get the dropdown button and content
    var dropdownButton = document.querySelector('.dropdown-custom-button');
    var dropdownContent = document.querySelector('.dropdown-custom-content');

    // Get all buttons with the class 'stake-button'
    const buttons = document.querySelectorAll('.stake-button');

    // Add an event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            // Perform different actions depending on the id of the clicked button
            buttons.forEach(button => button.classList.remove('selected'));
            this.classList.add('selected');
            if (this.id === 'add-collateral-selector') {
                document.getElementById('add-col-button').style.display = '';
                document.getElementById('remove-col-button').style.display = 'none';
            } else {
                document.getElementById('add-col-button').style.display = 'none';
                document.getElementById('remove-col-button').style.display = '';
            }
        });
    });

    // Add click event listeners to each option
    var options = document.querySelectorAll('.dropdown-custom-option');

    // Show the dropdown content when the button is clicked
    dropdownButton.addEventListener('click', function () {
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

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
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
    }

    // *********** Remove collateral CDP ***********
    document.getElementById('remove-col-button').onclick = async function () {
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

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
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
    }

    // *********** Close CDP ***********
    document.getElementById('close-entire-button').onclick = async function () {
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

        let cdpId = selectedCdp;

        if (status == "Liquidated" || status == "ForceLiquidated") {
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

            // Send manifest to extension for signing
            rdt.walletApi
                .sendTransaction({
                    transactionManifest: manifest,
                    version: 1,
                })
                .then(result => {
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

            // Send manifest to extension for signing
            rdt.walletApi
                .sendTransaction({
                    transactionManifest: manifest,
                    version: 1,
                })
                .then(result => {
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
        }
    }
}
if (window.location.pathname === '/borrow') {
    let colMax = document.getElementById('col-max');
    colMax.addEventListener('click', function () {
        if (selectedCollateral !== undefined) {
            document.getElementById("colToUse").value = Math.floor(availableCollateral * 100) / 100;
            let result = ((1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100)) * Math.floor(availableCollateral * 100) / 100;;
            collateralAmount = Math.floor(availableCollateral * 100) / 100;;
            document.getElementById("outputStab").innerHTML = customRound(result, 4);
            document.getElementById("ratio-suffix").innerHTML = "STAB";
        }
    });
    colMax.style.cursor = "pointer";

    var slider = document.getElementById('slider-single');
    var plus = document.getElementById('plus-button');
    var minus = document.getElementById('minus-button');
    var h2 = document.getElementById('colRatioStab');
    let colToUse = document.getElementById("colToUse");
    // Display the default slider value

    // Get the dropdown button and content
    var dropdownButton = document.querySelector('.dropdown-custom-button');
    var dropdownContent = document.querySelector('.dropdown-custom-content');

    // Add click event listeners to each option
    var options = document.querySelectorAll('.dropdown-custom-option');

    // Show the dropdown content when the button is clicked
    dropdownButton.addEventListener('click', function () {
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
        h2.textContent = slider.value;
        if (selectedCollateral !== undefined) {
            if (colToUse.value !== "") {
                let result = ((1 / (stabXrdRatio * validatorMultiplier)) / (this.value / 100)) * colToUse.value;
                collateralAmount = colToUse.value;
                document.getElementById("outputStab").innerHTML = customRound(result, 4);
            } else {
                let result = (1 / (stabXrdRatio * validatorMultiplier)) / (this.value / 100);
                collateralAmount = 0;
                document.getElementById("outputStab").innerHTML = customRound(result, 4);
            }
        }
        if (this.value >= 200) {
            document.getElementById('warning-low-ratio').style.display = 'none';
            document.getElementById('warning-good-ratio').style.display = '';
            document.getElementById('warning-impossible-ratio').style.display = 'none';
        } else if (this.value >= 150) {
            document.getElementById('warning-low-ratio').style.display = '';
            document.getElementById('warning-good-ratio').style.display = 'none';
            document.getElementById('warning-impossible-ratio').style.display = 'none';
        } else {
            document.getElementById('warning-low-ratio').style.display = 'none';
            document.getElementById('warning-good-ratio').style.display = 'none';
            document.getElementById('warning-impossible-ratio').style.display = '';
        }
    }

    plus.onclick = function () {
        slider.value = parseInt(slider.value) + 1;
        h2.textContent = slider.value;
        if (selectedCollateral !== undefined) {
            if (colToUse.value !== "") {
                let result = ((1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100)) * colToUse.value;
                collateralAmount = colToUse.value;
                document.getElementById("outputStab").innerHTML = customRound(result, 4);
            } else {
                let result = (1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100) * 1;
                collateralAmount = 0;
                document.getElementById("outputStab").innerHTML = customRound(result, 4);
            }
        }

        if (slider.value >= 200) {
            document.getElementById('warning-low-ratio').style.display = 'none';
            document.getElementById('warning-good-ratio').style.display = '';
            document.getElementById('warning-impossible-ratio').style.display = 'none';
        } else if (slider.value >= 150) {
            document.getElementById('warning-low-ratio').style.display = '';
            document.getElementById('warning-good-ratio').style.display = 'none';
            document.getElementById('warning-impossible-ratio').style.display = 'none';
        } else {
            document.getElementById('warning-low-ratio').style.display = 'none';
            document.getElementById('warning-good-ratio').style.display = 'none';
            document.getElementById('warning-impossible-ratio').style.display = '';
        }
    }

    minus.onclick = function () {
        slider.value = parseInt(slider.value) - 1;
        h2.textContent = slider.value;
        if (selectedCollateral !== undefined) {
            if (colToUse.value !== "") {
                let result = ((1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100)) * colToUse.value;
                collateralAmount = colToUse.value;
                document.getElementById("outputStab").innerHTML = customRound(result, 4);
            } else {
                let result = (1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100) * 1;
                collateralAmount = 0;
                document.getElementById("outputStab").innerHTML = customRound(result, 4);
            }
        }

        if (slider.value >= 200) {
            document.getElementById('warning-low-ratio').style.display = 'none';
            document.getElementById('warning-good-ratio').style.display = '';
            document.getElementById('warning-impossible-ratio').style.display = 'none';
        } else if (slider.value >= 150) {
            document.getElementById('warning-low-ratio').style.display = '';
            document.getElementById('warning-good-ratio').style.display = 'none';
            document.getElementById('warning-impossible-ratio').style.display = 'none';
        } else {
            document.getElementById('warning-low-ratio').style.display = 'none';
            document.getElementById('warning-good-ratio').style.display = 'none';
            document.getElementById('warning-impossible-ratio').style.display = '';
        }
    }

    document.getElementById("colToUse").oninput = function () {
        h2.textContent = slider.value;
        if (selectedCollateral !== undefined) {
            if (this.value !== "") {
                let result = ((1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100)) * this.value;
                collateralAmount = this.value;
                document.getElementById("outputStab").innerHTML = customRound(result, 4);
            } else {
                let result = (1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100) * 1;
                collateralAmount = 0;
                document.getElementById("outputStab").innerHTML = customRound(result, 4);
            }
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

        let mintAmount = 1;
        mintAmount = document.getElementById("outputStab").innerHTML;
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
    true;
    CALL_METHOD
    Address("${accountAddress}")
    "deposit_batch"
    Expression("ENTIRE_WORKTOP");
    `
        console.log('Mint manifest: ', manifest)

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
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

    // *********** Mint unsafe *********** //
    document.getElementById('unsafe-mint-button').onclick = async function () {
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

        let mintAmount = 1;
        mintAmount = document.getElementById("outputStab").innerHTML;
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

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
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
}

//RIP this big mess of webflow code

(() => {
    var be = (t, d) => () => (d || t((d = { exports: {} }).exports, d), d.exports); var Ge = be(() => { "use strict"; window.tram = function (t) { function d(e, i) { var s = new g.Bare; return s.init(e, i) } function p(e) { return e.replace(/[A-Z]/g, function (i) { return "-" + i.toLowerCase() }) } function S(e) { var i = parseInt(e.slice(1), 16), s = i >> 16 & 255, a = i >> 8 & 255, o = 255 & i; return [s, a, o] } function K(e, i, s) { return "#" + (1 << 24 | e << 16 | i << 8 | s).toString(16).slice(1) } function T() { } function W(e, i) { Z("Type warning: Expected: [" + e + "] Got: [" + typeof i + "] " + i) } function M(e, i, s) { Z("Units do not match [" + e + "]: " + i + ", " + s) } function I(e, i, s) { if (i !== void 0 && (s = i), e === void 0) return s; var a = s; return De.test(e) || !Se.test(e) ? a = parseInt(e, 10) : Se.test(e) && (a = 1e3 * parseFloat(e)), 0 > a && (a = 0), a === a ? a : s } function Z(e) { V.debug && window && window.console.warn(e) } function oe(e) { for (var i = -1, s = e ? e.length : 0, a = []; ++i < s;) { var o = e[i]; o && a.push(o) } return a } var G = function (e, i, s) { function a(H) { return typeof H == "object" } function o(H) { return typeof H == "function" } function u() { } function R(H, se) { function w() { var ge = new X; return o(ge.init) && ge.init.apply(ge, arguments), ge } function X() { } se === s && (se = H, H = Object), w.Bare = X; var j, de = u[e] = H[e], Le = X[e] = w[e] = new u; return Le.constructor = w, w.mixin = function (ge) { return X[e] = w[e] = R(w, ge)[e], w }, w.open = function (ge) { if (j = {}, o(ge) ? j = ge.call(w, Le, de, w, H) : a(ge) && (j = ge), a(j)) for (var He in j) i.call(j, He) && (Le[He] = j[He]); return o(Le.init) || (Le.init = H), w }, w.open(se) } return R }("prototype", {}.hasOwnProperty), J = { ease: ["ease", function (e, i, s, a) { var o = (e /= a) * e, u = o * e; return i + s * (-2.75 * u * o + 11 * o * o + -15.5 * u + 8 * o + .25 * e) }], "ease-in": ["ease-in", function (e, i, s, a) { var o = (e /= a) * e, u = o * e; return i + s * (-1 * u * o + 3 * o * o + -3 * u + 2 * o) }], "ease-out": ["ease-out", function (e, i, s, a) { var o = (e /= a) * e, u = o * e; return i + s * (.3 * u * o + -1.6 * o * o + 2.2 * u + -1.8 * o + 1.9 * e) }], "ease-in-out": ["ease-in-out", function (e, i, s, a) { var o = (e /= a) * e, u = o * e; return i + s * (2 * u * o + -5 * o * o + 2 * u + 2 * o) }], linear: ["linear", function (e, i, s, a) { return s * e / a + i }], "ease-in-quad": ["cubic-bezier(0.550, 0.085, 0.680, 0.530)", function (e, i, s, a) { return s * (e /= a) * e + i }], "ease-out-quad": ["cubic-bezier(0.250, 0.460, 0.450, 0.940)", function (e, i, s, a) { return -s * (e /= a) * (e - 2) + i }], "ease-in-out-quad": ["cubic-bezier(0.455, 0.030, 0.515, 0.955)", function (e, i, s, a) { return (e /= a / 2) < 1 ? s / 2 * e * e + i : -s / 2 * (--e * (e - 2) - 1) + i }], "ease-in-cubic": ["cubic-bezier(0.550, 0.055, 0.675, 0.190)", function (e, i, s, a) { return s * (e /= a) * e * e + i }], "ease-out-cubic": ["cubic-bezier(0.215, 0.610, 0.355, 1)", function (e, i, s, a) { return s * ((e = e / a - 1) * e * e + 1) + i }], "ease-in-out-cubic": ["cubic-bezier(0.645, 0.045, 0.355, 1)", function (e, i, s, a) { return (e /= a / 2) < 1 ? s / 2 * e * e * e + i : s / 2 * ((e -= 2) * e * e + 2) + i }], "ease-in-quart": ["cubic-bezier(0.895, 0.030, 0.685, 0.220)", function (e, i, s, a) { return s * (e /= a) * e * e * e + i }], "ease-out-quart": ["cubic-bezier(0.165, 0.840, 0.440, 1)", function (e, i, s, a) { return -s * ((e = e / a - 1) * e * e * e - 1) + i }], "ease-in-out-quart": ["cubic-bezier(0.770, 0, 0.175, 1)", function (e, i, s, a) { return (e /= a / 2) < 1 ? s / 2 * e * e * e * e + i : -s / 2 * ((e -= 2) * e * e * e - 2) + i }], "ease-in-quint": ["cubic-bezier(0.755, 0.050, 0.855, 0.060)", function (e, i, s, a) { return s * (e /= a) * e * e * e * e + i }], "ease-out-quint": ["cubic-bezier(0.230, 1, 0.320, 1)", function (e, i, s, a) { return s * ((e = e / a - 1) * e * e * e * e + 1) + i }], "ease-in-out-quint": ["cubic-bezier(0.860, 0, 0.070, 1)", function (e, i, s, a) { return (e /= a / 2) < 1 ? s / 2 * e * e * e * e * e + i : s / 2 * ((e -= 2) * e * e * e * e + 2) + i }], "ease-in-sine": ["cubic-bezier(0.470, 0, 0.745, 0.715)", function (e, i, s, a) { return -s * Math.cos(e / a * (Math.PI / 2)) + s + i }], "ease-out-sine": ["cubic-bezier(0.390, 0.575, 0.565, 1)", function (e, i, s, a) { return s * Math.sin(e / a * (Math.PI / 2)) + i }], "ease-in-out-sine": ["cubic-bezier(0.445, 0.050, 0.550, 0.950)", function (e, i, s, a) { return -s / 2 * (Math.cos(Math.PI * e / a) - 1) + i }], "ease-in-expo": ["cubic-bezier(0.950, 0.050, 0.795, 0.035)", function (e, i, s, a) { return e === 0 ? i : s * Math.pow(2, 10 * (e / a - 1)) + i }], "ease-out-expo": ["cubic-bezier(0.190, 1, 0.220, 1)", function (e, i, s, a) { return e === a ? i + s : s * (-Math.pow(2, -10 * e / a) + 1) + i }], "ease-in-out-expo": ["cubic-bezier(1, 0, 0, 1)", function (e, i, s, a) { return e === 0 ? i : e === a ? i + s : (e /= a / 2) < 1 ? s / 2 * Math.pow(2, 10 * (e - 1)) + i : s / 2 * (-Math.pow(2, -10 * --e) + 2) + i }], "ease-in-circ": ["cubic-bezier(0.600, 0.040, 0.980, 0.335)", function (e, i, s, a) { return -s * (Math.sqrt(1 - (e /= a) * e) - 1) + i }], "ease-out-circ": ["cubic-bezier(0.075, 0.820, 0.165, 1)", function (e, i, s, a) { return s * Math.sqrt(1 - (e = e / a - 1) * e) + i }], "ease-in-out-circ": ["cubic-bezier(0.785, 0.135, 0.150, 0.860)", function (e, i, s, a) { return (e /= a / 2) < 1 ? -s / 2 * (Math.sqrt(1 - e * e) - 1) + i : s / 2 * (Math.sqrt(1 - (e -= 2) * e) + 1) + i }], "ease-in-back": ["cubic-bezier(0.600, -0.280, 0.735, 0.045)", function (e, i, s, a, o) { return o === void 0 && (o = 1.70158), s * (e /= a) * e * ((o + 1) * e - o) + i }], "ease-out-back": ["cubic-bezier(0.175, 0.885, 0.320, 1.275)", function (e, i, s, a, o) { return o === void 0 && (o = 1.70158), s * ((e = e / a - 1) * e * ((o + 1) * e + o) + 1) + i }], "ease-in-out-back": ["cubic-bezier(0.680, -0.550, 0.265, 1.550)", function (e, i, s, a, o) { return o === void 0 && (o = 1.70158), (e /= a / 2) < 1 ? s / 2 * e * e * (((o *= 1.525) + 1) * e - o) + i : s / 2 * ((e -= 2) * e * (((o *= 1.525) + 1) * e + o) + 2) + i }] }, F = { "ease-in-back": "cubic-bezier(0.600, 0, 0.735, 0.045)", "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1)", "ease-in-out-back": "cubic-bezier(0.680, 0, 0.265, 1)" }, ee = document, te = window, Q = "bkwld-tram", U = /[\-\.0-9]/g, D = /[A-Z]/, E = "number", $ = /^(rgb|#)/, z = /(em|cm|mm|in|pt|pc|px)$/, Y = /(em|cm|mm|in|pt|pc|px|%)$/, ue = /(deg|rad|turn)$/, fe = "unitless", pe = /(all|none) 0s ease 0s/, Ee = /^(width|height)$/, he = " ", y = ee.createElement("a"), l = ["Webkit", "Moz", "O", "ms"], v = ["-webkit-", "-moz-", "-o-", "-ms-"], L = function (e) { if (e in y.style) return { dom: e, css: e }; var i, s, a = "", o = e.split("-"); for (i = 0; i < o.length; i++)a += o[i].charAt(0).toUpperCase() + o[i].slice(1); for (i = 0; i < l.length; i++)if (s = l[i] + a, s in y.style) return { dom: s, css: v[i] + e } }, _ = d.support = { bind: Function.prototype.bind, transform: L("transform"), transition: L("transition"), backface: L("backface-visibility"), timing: L("transition-timing-function") }; if (_.transition) { var q = _.timing.dom; if (y.style[q] = J["ease-in-back"][0], !y.style[q]) for (var N in F) J[N][0] = F[N] } var f = d.frame = function () { var e = te.requestAnimationFrame || te.webkitRequestAnimationFrame || te.mozRequestAnimationFrame || te.oRequestAnimationFrame || te.msRequestAnimationFrame; return e && _.bind ? e.bind(te) : function (i) { te.setTimeout(i, 16) } }(), O = d.now = function () { var e = te.performance, i = e && (e.now || e.webkitNow || e.msNow || e.mozNow); return i && _.bind ? i.bind(e) : Date.now || function () { return +new Date } }(), A = G(function (e) { function i(P, ne) { var ce = oe(("" + P).split(he)), re = ce[0]; ne = ne || {}; var we = k[re]; if (!we) return Z("Unsupported property: " + re); if (!ne.weak || !this.props[re]) { var ke = we[0], ye = this.props[re]; return ye || (ye = this.props[re] = new ke.Bare), ye.init(this.$el, ce, we, ne), ye } } function s(P, ne, ce) { if (P) { var re = typeof P; if (ne || (this.timer && this.timer.destroy(), this.queue = [], this.active = !1), re == "number" && ne) return this.timer = new B({ duration: P, context: this, complete: u }), void (this.active = !0); if (re == "string" && ne) { switch (P) { case "hide": w.call(this); break; case "stop": R.call(this); break; case "redraw": X.call(this); break; default: i.call(this, P, ce && ce[1]) }return u.call(this) } if (re == "function") return void P.call(this, this); if (re == "object") { var we = 0; Le.call(this, P, function (ve, Ut) { ve.span > we && (we = ve.span), ve.stop(), ve.animate(Ut) }, function (ve) { "wait" in ve && (we = I(ve.wait, 0)) }), de.call(this), we > 0 && (this.timer = new B({ duration: we, context: this }), this.active = !0, ne && (this.timer.complete = u)); var ke = this, ye = !1, ze = {}; f(function () { Le.call(ke, P, function (ve) { ve.active && (ye = !0, ze[ve.name] = ve.nextStyle) }), ye && ke.$el.css(ze) }) } } } function a(P) { P = I(P, 0), this.active ? this.queue.push({ options: P }) : (this.timer = new B({ duration: P, context: this, complete: u }), this.active = !0) } function o(P) { return this.active ? (this.queue.push({ options: P, args: arguments }), void (this.timer.complete = u)) : Z("No active transition timer. Use start() or wait() before then().") } function u() { if (this.timer && this.timer.destroy(), this.active = !1, this.queue.length) { var P = this.queue.shift(); s.call(this, P.options, !0, P.args) } } function R(P) { this.timer && this.timer.destroy(), this.queue = [], this.active = !1; var ne; typeof P == "string" ? (ne = {}, ne[P] = 1) : ne = typeof P == "object" && P != null ? P : this.props, Le.call(this, ne, ge), de.call(this) } function H(P) { R.call(this, P), Le.call(this, P, He, Ht) } function se(P) { typeof P != "string" && (P = "block"), this.el.style.display = P } function w() { R.call(this), this.el.style.display = "none" } function X() { this.el.offsetHeight } function j() { R.call(this), t.removeData(this.el, Q), this.$el = this.el = null } function de() { var P, ne, ce = []; this.upstream && ce.push(this.upstream); for (P in this.props) ne = this.props[P], ne.active && ce.push(ne.string); ce = ce.join(","), this.style !== ce && (this.style = ce, this.el.style[_.transition.dom] = ce) } function Le(P, ne, ce) { var re, we, ke, ye, ze = ne !== ge, ve = {}; for (re in P) ke = P[re], re in ae ? (ve.transform || (ve.transform = {}), ve.transform[re] = ke) : (D.test(re) && (re = p(re)), re in k ? ve[re] = ke : (ye || (ye = {}), ye[re] = ke)); for (re in ve) { if (ke = ve[re], we = this.props[re], !we) { if (!ze) continue; we = i.call(this, re) } ne.call(this, we, ke) } ce && ye && ce.call(this, ye) } function ge(P) { P.stop() } function He(P, ne) { P.set(ne) } function Ht(P) { this.$el.css(P) } function xe(P, ne) { e[P] = function () { return this.children ? zt.call(this, ne, arguments) : (this.el && ne.apply(this, arguments), this) } } function zt(P, ne) { var ce, re = this.children.length; for (ce = 0; re > ce; ce++)P.apply(this.children[ce], ne); return this } e.init = function (P) { if (this.$el = t(P), this.el = this.$el[0], this.props = {}, this.queue = [], this.style = "", this.active = !1, V.keepInherited && !V.fallback) { var ne = m(this.el, "transition"); ne && !pe.test(ne) && (this.upstream = ne) } _.backface && V.hideBackface && n(this.el, _.backface.css, "hidden") }, xe("add", i), xe("start", s), xe("wait", a), xe("then", o), xe("next", u), xe("stop", R), xe("set", H), xe("show", se), xe("hide", w), xe("redraw", X), xe("destroy", j) }), g = G(A, function (e) { function i(s, a) { var o = t.data(s, Q) || t.data(s, Q, new A.Bare); return o.el || o.init(s), a ? o.start(a) : o } e.init = function (s, a) { var o = t(s); if (!o.length) return this; if (o.length === 1) return i(o[0], a); var u = []; return o.each(function (R, H) { u.push(i(H, a)) }), this.children = u, this } }), h = G(function (e) { function i() { var u = this.get(); this.update("auto"); var R = this.get(); return this.update(u), R } function s(u, R, H) { return R !== void 0 && (H = R), u in J ? u : H } function a(u) { var R = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(u); return (R ? K(R[1], R[2], R[3]) : u).replace(/#(\w)(\w)(\w)$/, "#$1$1$2$2$3$3") } var o = { duration: 500, ease: "ease", delay: 0 }; e.init = function (u, R, H, se) { this.$el = u, this.el = u[0]; var w = R[0]; H[2] && (w = H[2]), C[w] && (w = C[w]), this.name = w, this.type = H[1], this.duration = I(R[1], this.duration, o.duration), this.ease = s(R[2], this.ease, o.ease), this.delay = I(R[3], this.delay, o.delay), this.span = this.duration + this.delay, this.active = !1, this.nextStyle = null, this.auto = Ee.test(this.name), this.unit = se.unit || this.unit || V.defaultUnit, this.angle = se.angle || this.angle || V.defaultAngle, V.fallback || se.fallback ? this.animate = this.fallback : (this.animate = this.transition, this.string = this.name + he + this.duration + "ms" + (this.ease != "ease" ? he + J[this.ease][0] : "") + (this.delay ? he + this.delay + "ms" : "")) }, e.set = function (u) { u = this.convert(u, this.type), this.update(u), this.redraw() }, e.transition = function (u) { this.active = !0, u = this.convert(u, this.type), this.auto && (this.el.style[this.name] == "auto" && (this.update(this.get()), this.redraw()), u == "auto" && (u = i.call(this))), this.nextStyle = u }, e.fallback = function (u) { var R = this.el.style[this.name] || this.convert(this.get(), this.type); u = this.convert(u, this.type), this.auto && (R == "auto" && (R = this.convert(this.get(), this.type)), u == "auto" && (u = i.call(this))), this.tween = new c({ from: R, to: u, duration: this.duration, delay: this.delay, ease: this.ease, update: this.update, context: this }) }, e.get = function () { return m(this.el, this.name) }, e.update = function (u) { n(this.el, this.name, u) }, e.stop = function () { (this.active || this.nextStyle) && (this.active = !1, this.nextStyle = null, n(this.el, this.name, this.get())); var u = this.tween; u && u.context && u.destroy() }, e.convert = function (u, R) { if (u == "auto" && this.auto) return u; var H, se = typeof u == "number", w = typeof u == "string"; switch (R) { case E: if (se) return u; if (w && u.replace(U, "") === "") return +u; H = "number(unitless)"; break; case $: if (w) { if (u === "" && this.original) return this.original; if (R.test(u)) return u.charAt(0) == "#" && u.length == 7 ? u : a(u) } H = "hex or rgb string"; break; case z: if (se) return u + this.unit; if (w && R.test(u)) return u; H = "number(px) or string(unit)"; break; case Y: if (se) return u + this.unit; if (w && R.test(u)) return u; H = "number(px) or string(unit or %)"; break; case ue: if (se) return u + this.angle; if (w && R.test(u)) return u; H = "number(deg) or string(angle)"; break; case fe: if (se || w && Y.test(u)) return u; H = "number(unitless) or string(unit or %)" }return W(H, u), u }, e.redraw = function () { this.el.offsetHeight } }), r = G(h, function (e, i) { e.init = function () { i.init.apply(this, arguments), this.original || (this.original = this.convert(this.get(), $)) } }), b = G(h, function (e, i) { e.init = function () { i.init.apply(this, arguments), this.animate = this.fallback }, e.get = function () { return this.$el[this.name]() }, e.update = function (s) { this.$el[this.name](s) } }), x = G(h, function (e, i) { function s(a, o) { var u, R, H, se, w; for (u in a) se = ae[u], H = se[0], R = se[1] || u, w = this.convert(a[u], H), o.call(this, R, w, H) } e.init = function () { i.init.apply(this, arguments), this.current || (this.current = {}, ae.perspective && V.perspective && (this.current.perspective = V.perspective, n(this.el, this.name, this.style(this.current)), this.redraw())) }, e.set = function (a) { s.call(this, a, function (o, u) { this.current[o] = u }), n(this.el, this.name, this.style(this.current)), this.redraw() }, e.transition = function (a) { var o = this.values(a); this.tween = new le({ current: this.current, values: o, duration: this.duration, delay: this.delay, ease: this.ease }); var u, R = {}; for (u in this.current) R[u] = u in o ? o[u] : this.current[u]; this.active = !0, this.nextStyle = this.style(R) }, e.fallback = function (a) { var o = this.values(a); this.tween = new le({ current: this.current, values: o, duration: this.duration, delay: this.delay, ease: this.ease, update: this.update, context: this }) }, e.update = function () { n(this.el, this.name, this.style(this.current)) }, e.style = function (a) { var o, u = ""; for (o in a) u += o + "(" + a[o] + ") "; return u }, e.values = function (a) { var o, u = {}; return s.call(this, a, function (R, H, se) { u[R] = H, this.current[R] === void 0 && (o = 0, ~R.indexOf("scale") && (o = 1), this.current[R] = this.convert(o, se)) }), u } }), c = G(function (e) { function i(w) { H.push(w) === 1 && f(s) } function s() { var w, X, j, de = H.length; if (de) for (f(s), X = O(), w = de; w--;)j = H[w], j && j.render(X) } function a(w) { var X, j = t.inArray(w, H); j >= 0 && (X = H.slice(j + 1), H.length = j, X.length && (H = H.concat(X))) } function o(w) { return Math.round(w * se) / se } function u(w, X, j) { return K(w[0] + j * (X[0] - w[0]), w[1] + j * (X[1] - w[1]), w[2] + j * (X[2] - w[2])) } var R = { ease: J.ease[1], from: 0, to: 1 }; e.init = function (w) { this.duration = w.duration || 0, this.delay = w.delay || 0; var X = w.ease || R.ease; J[X] && (X = J[X][1]), typeof X != "function" && (X = R.ease), this.ease = X, this.update = w.update || T, this.complete = w.complete || T, this.context = w.context || this, this.name = w.name; var j = w.from, de = w.to; j === void 0 && (j = R.from), de === void 0 && (de = R.to), this.unit = w.unit || "", typeof j == "number" && typeof de == "number" ? (this.begin = j, this.change = de - j) : this.format(de, j), this.value = this.begin + this.unit, this.start = O(), w.autoplay !== !1 && this.play() }, e.play = function () { this.active || (this.start || (this.start = O()), this.active = !0, i(this)) }, e.stop = function () { this.active && (this.active = !1, a(this)) }, e.render = function (w) { var X, j = w - this.start; if (this.delay) { if (j <= this.delay) return; j -= this.delay } if (j < this.duration) { var de = this.ease(j, 0, 1, this.duration); return X = this.startRGB ? u(this.startRGB, this.endRGB, de) : o(this.begin + de * this.change), this.value = X + this.unit, void this.update.call(this.context, this.value) } X = this.endHex || this.begin + this.change, this.value = X + this.unit, this.update.call(this.context, this.value), this.complete.call(this.context), this.destroy() }, e.format = function (w, X) { if (X += "", w += "", w.charAt(0) == "#") return this.startRGB = S(X), this.endRGB = S(w), this.endHex = w, this.begin = 0, void (this.change = 1); if (!this.unit) { var j = X.replace(U, ""), de = w.replace(U, ""); j !== de && M("tween", X, w), this.unit = j } X = parseFloat(X), w = parseFloat(w), this.begin = this.value = X, this.change = w - X }, e.destroy = function () { this.stop(), this.context = null, this.ease = this.update = this.complete = T }; var H = [], se = 1e3 }), B = G(c, function (e) { e.init = function (i) { this.duration = i.duration || 0, this.complete = i.complete || T, this.context = i.context, this.play() }, e.render = function (i) { var s = i - this.start; s < this.duration || (this.complete.call(this.context), this.destroy()) } }), le = G(c, function (e, i) { e.init = function (s) { this.context = s.context, this.update = s.update, this.tweens = [], this.current = s.current; var a, o; for (a in s.values) o = s.values[a], this.current[a] !== o && this.tweens.push(new c({ name: a, from: this.current[a], to: o, duration: s.duration, delay: s.delay, ease: s.ease, autoplay: !1 })); this.play() }, e.render = function (s) { var a, o, u = this.tweens.length, R = !1; for (a = u; a--;)o = this.tweens[a], o.context && (o.render(s), this.current[o.name] = o.value, R = !0); return R ? void (this.update && this.update.call(this.context)) : this.destroy() }, e.destroy = function () { if (i.destroy.call(this), this.tweens) { var s, a = this.tweens.length; for (s = a; s--;)this.tweens[s].destroy(); this.tweens = null, this.current = null } } }), V = d.config = { debug: !1, defaultUnit: "px", defaultAngle: "deg", keepInherited: !1, hideBackface: !1, perspective: "", fallback: !_.transition, agentTests: [] }; d.fallback = function (e) { if (!_.transition) return V.fallback = !0; V.agentTests.push("(" + e + ")"); var i = new RegExp(V.agentTests.join("|"), "i"); V.fallback = i.test(navigator.userAgent) }, d.fallback("6.0.[2-5] Safari"), d.tween = function (e) { return new c(e) }, d.delay = function (e, i, s) { return new B({ complete: i, duration: e, context: s }) }, t.fn.tram = function (e) { return d.call(null, this, e) }; var n = t.style, m = t.css, C = { transform: _.transform && _.transform.css }, k = { color: [r, $], background: [r, $, "background-color"], "outline-color": [r, $], "border-color": [r, $], "border-top-color": [r, $], "border-right-color": [r, $], "border-bottom-color": [r, $], "border-left-color": [r, $], "border-width": [h, z], "border-top-width": [h, z], "border-right-width": [h, z], "border-bottom-width": [h, z], "border-left-width": [h, z], "border-spacing": [h, z], "letter-spacing": [h, z], margin: [h, z], "margin-top": [h, z], "margin-right": [h, z], "margin-bottom": [h, z], "margin-left": [h, z], padding: [h, z], "padding-top": [h, z], "padding-right": [h, z], "padding-bottom": [h, z], "padding-left": [h, z], "outline-width": [h, z], opacity: [h, E], top: [h, Y], right: [h, Y], bottom: [h, Y], left: [h, Y], "font-size": [h, Y], "text-indent": [h, Y], "word-spacing": [h, Y], width: [h, Y], "min-width": [h, Y], "max-width": [h, Y], height: [h, Y], "min-height": [h, Y], "max-height": [h, Y], "line-height": [h, fe], "scroll-top": [b, E, "scrollTop"], "scroll-left": [b, E, "scrollLeft"] }, ae = {}; _.transform && (k.transform = [x], ae = { x: [Y, "translateX"], y: [Y, "translateY"], rotate: [ue], rotateX: [ue], rotateY: [ue], scale: [E], scaleX: [E], scaleY: [E], skew: [ue], skewX: [ue], skewY: [ue] }), _.transform && _.backface && (ae.z = [Y, "translateZ"], ae.rotateZ = [ue], ae.scaleZ = [E], ae.perspective = [z]); var De = /ms/, Se = /s|\./; return t.tram = d }(window.jQuery) }); var it = be((cn, rt) => {
        "use strict"; var Bt = window.$, $t = Ge() && Bt.tram; rt.exports = function () {
            var t = {}; t.VERSION = "1.6.0-Webflow"; var d = {}, p = Array.prototype, S = Object.prototype, K = Function.prototype, T = p.push, W = p.slice, M = p.concat, I = S.toString, Z = S.hasOwnProperty, oe = p.forEach, G = p.map, J = p.reduce, F = p.reduceRight, ee = p.filter, te = p.every, Q = p.some, U = p.indexOf, D = p.lastIndexOf, E = Array.isArray, $ = Object.keys, z = K.bind, Y = t.each = t.forEach = function (l, v, L) { if (l == null) return l; if (oe && l.forEach === oe) l.forEach(v, L); else if (l.length === +l.length) { for (var _ = 0, q = l.length; _ < q; _++)if (v.call(L, l[_], _, l) === d) return } else for (var N = t.keys(l), _ = 0, q = N.length; _ < q; _++)if (v.call(L, l[N[_]], N[_], l) === d) return; return l }; t.map = t.collect = function (l, v, L) { var _ = []; return l == null ? _ : G && l.map === G ? l.map(v, L) : (Y(l, function (q, N, f) { _.push(v.call(L, q, N, f)) }), _) }, t.find = t.detect = function (l, v, L) { var _; return ue(l, function (q, N, f) { if (v.call(L, q, N, f)) return _ = q, !0 }), _ }, t.filter = t.select = function (l, v, L) { var _ = []; return l == null ? _ : ee && l.filter === ee ? l.filter(v, L) : (Y(l, function (q, N, f) { v.call(L, q, N, f) && _.push(q) }), _) }; var ue = t.some = t.any = function (l, v, L) { v || (v = t.identity); var _ = !1; return l == null ? _ : Q && l.some === Q ? l.some(v, L) : (Y(l, function (q, N, f) { if (_ || (_ = v.call(L, q, N, f))) return d }), !!_) }; t.contains = t.include = function (l, v) { return l == null ? !1 : U && l.indexOf === U ? l.indexOf(v) != -1 : ue(l, function (L) { return L === v }) }, t.delay = function (l, v) { var L = W.call(arguments, 2); return setTimeout(function () { return l.apply(null, L) }, v) }, t.defer = function (l) { return t.delay.apply(t, [l, 1].concat(W.call(arguments, 1))) }, t.throttle = function (l) { var v, L, _; return function () { v || (v = !0, L = arguments, _ = this, $t.frame(function () { v = !1, l.apply(_, L) })) } }, t.debounce = function (l, v, L) { var _, q, N, f, O, A = function () { var g = t.now() - f; g < v ? _ = setTimeout(A, v - g) : (_ = null, L || (O = l.apply(N, q), N = q = null)) }; return function () { N = this, q = arguments, f = t.now(); var g = L && !_; return _ || (_ = setTimeout(A, v)), g && (O = l.apply(N, q), N = q = null), O } }, t.defaults = function (l) { if (!t.isObject(l)) return l; for (var v = 1, L = arguments.length; v < L; v++) { var _ = arguments[v]; for (var q in _) l[q] === void 0 && (l[q] = _[q]) } return l }, t.keys = function (l) { if (!t.isObject(l)) return []; if ($) return $(l); var v = []; for (var L in l) t.has(l, L) && v.push(L); return v }, t.has = function (l, v) { return Z.call(l, v) }, t.isObject = function (l) { return l === Object(l) }, t.now = Date.now || function () { return new Date().getTime() }, t.templateSettings = { evaluate: /<%([\s\S]+?)%>/g, interpolate: /<%=([\s\S]+?)%>/g, escape: /<%-([\s\S]+?)%>/g }; var fe = /(.)^/, pe = { "'": "'", "\\": "\\", "\r": "r", "\n": "n", "\u2028": "u2028", "\u2029": "u2029" }, Ee = /\\|'|\r|\n|\u2028|\u2029/g, he = function (l) { return "\\" + pe[l] }, y = /^\s*(\w|\$)+\s*$/; return t.template = function (l, v, L) {
                !v && L && (v = L), v = t.defaults({}, v, t.templateSettings); var _ = RegExp([(v.escape || fe).source, (v.interpolate || fe).source, (v.evaluate || fe).source].join("|") + "|$", "g"), q = 0, N = "__p+='"; l.replace(_, function (g, h, r, b, x) {
                    return N += l.slice(q, x).replace(Ee, he), q = x + g.length, h ? N += `'+
((__t=(`+ h + `))==null?'':_.escape(__t))+
'`: r ? N += `'+
((__t=(`+ r + `))==null?'':__t)+
'`: b && (N += `';
`+ b + `
__p+='`), g
                }), N += `';
`; var f = v.variable; if (f) { if (!y.test(f)) throw new Error("variable is not a bare identifier: " + f) } else N = `with(obj||{}){
`+ N + `}
`, f = "obj"; N = `var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
`+ N + `return __p;
`; var O; try { O = new Function(v.variable || "obj", "_", N) } catch (g) { throw g.source = N, g } var A = function (g) { return O.call(this, g, t) }; return A.source = "function(" + f + `){
`+ N + "}", A
            }, t
        }()
    }); var Ce = be((ln, dt) => { "use strict"; var ie = {}, Ne = {}, We = [], Ze = window.Webflow || [], Ie = window.jQuery, Oe = Ie(window), Kt = Ie(document), Te = Ie.isFunction, _e = ie._ = it(), st = ie.tram = Ge() && Ie.tram, Be = !1, Qe = !1; st.config.hideBackface = !1; st.config.keepInherited = !0; ie.define = function (t, d, p) { Ne[t] && ut(Ne[t]); var S = Ne[t] = d(Ie, _e, p) || {}; return at(S), S }; ie.require = function (t) { return Ne[t] }; function at(t) { ie.env() && (Te(t.design) && Oe.on("__wf_design", t.design), Te(t.preview) && Oe.on("__wf_preview", t.preview)), Te(t.destroy) && Oe.on("__wf_destroy", t.destroy), t.ready && Te(t.ready) && Xt(t) } function Xt(t) { if (Be) { t.ready(); return } _e.contains(We, t.ready) || We.push(t.ready) } function ut(t) { Te(t.design) && Oe.off("__wf_design", t.design), Te(t.preview) && Oe.off("__wf_preview", t.preview), Te(t.destroy) && Oe.off("__wf_destroy", t.destroy), t.ready && Te(t.ready) && Vt(t) } function Vt(t) { We = _e.filter(We, function (d) { return d !== t.ready }) } ie.push = function (t) { if (Be) { Te(t) && t(); return } Ze.push(t) }; ie.env = function (t) { var d = window.__wf_design, p = typeof d < "u"; if (!t) return p; if (t === "design") return p && d; if (t === "preview") return p && !d; if (t === "slug") return p && window.__wf_slug; if (t === "editor") return window.WebflowEditor; if (t === "test") return window.__wf_test; if (t === "frame") return window !== window.top }; var Ue = navigator.userAgent.toLowerCase(), ct = ie.env.touch = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch, Gt = ie.env.chrome = /chrome/.test(Ue) && /Google/.test(navigator.vendor) && parseInt(Ue.match(/chrome\/(\d+)\./)[1], 10), Yt = ie.env.ios = /(ipod|iphone|ipad)/.test(Ue); ie.env.safari = /safari/.test(Ue) && !Gt && !Yt; var Ye; ct && Kt.on("touchstart mousedown", function (t) { Ye = t.target }); ie.validClick = ct ? function (t) { return t === Ye || Ie.contains(t, Ye) } : function () { return !0 }; var lt = "resize.webflow orientationchange.webflow load.webflow", Zt = "scroll.webflow " + lt; ie.resize = je(Oe, lt); ie.scroll = je(Oe, Zt); ie.redraw = je(); function je(t, d) { var p = [], S = {}; return S.up = _e.throttle(function (K) { _e.each(p, function (T) { T(K) }) }), t && d && t.on(d, S.up), S.on = function (K) { typeof K == "function" && (_e.contains(p, K) || p.push(K)) }, S.off = function (K) { if (!arguments.length) { p = []; return } p = _e.filter(p, function (T) { return T !== K }) }, S } ie.location = function (t) { window.location = t }; ie.env() && (ie.location = function () { }); ie.ready = function () { Be = !0, Qe ? Qt() : _e.each(We, ot), _e.each(Ze, ot), ie.resize.up() }; function ot(t) { Te(t) && t() } function Qt() { Qe = !1, _e.each(Ne, at) } var Fe; ie.load = function (t) { Fe.then(t) }; function ft() { Fe && (Fe.reject(), Oe.off("load", Fe.resolve)), Fe = new Ie.Deferred, Oe.on("load", Fe.resolve) } ie.destroy = function (t) { t = t || {}, Qe = !0, Oe.triggerHandler("__wf_destroy"), t.domready != null && (Be = t.domready), _e.each(Ne, ut), ie.resize.off(), ie.scroll.off(), ie.redraw.off(), We = [], Ze = [], Fe.state() === "pending" && ft() }; Ie(ie.ready); ft(); dt.exports = window.Webflow = ie }); var pt = be((fn, ht) => { "use strict"; var vt = Ce(); vt.define("brand", ht.exports = function (t) { var d = {}, p = document, S = t("html"), K = t("body"), T = ".w-webflow-badge", W = window.location, M = /PhantomJS/i.test(navigator.userAgent), I = "fullscreenchange webkitfullscreenchange mozfullscreenchange msfullscreenchange", Z; d.ready = function () { var F = S.attr("data-wf-status"), ee = S.attr("data-wf-domain") || ""; /\.webflow\.io$/i.test(ee) && W.hostname !== ee && (F = !0), F && !M && (Z = Z || G(), J(), setTimeout(J, 500), t(p).off(I, oe).on(I, oe)) }; function oe() { var F = p.fullScreen || p.mozFullScreen || p.webkitIsFullScreen || p.msFullscreenElement || !!p.webkitFullscreenElement; t(Z).attr("style", F ? "display: none !important;" : "") } function G() { var F = t('<a class="w-webflow-badge"></a>').attr("href", "https://webflow.com?utm_campaign=brandjs"), ee = t("<img>").attr("src", "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-icon-d2.89e12c322e.svg").attr("alt", "").css({ marginRight: "4px", width: "26px" }), te = t("<img>").attr("src", "https://d3e54v103j8qbb.cloudfront.net/img/webflow-badge-text-d2.c82cec3b78.svg").attr("alt", "Made in Webflow"); return F.append(ee, te), F[0] } function J() { var F = K.children(T), ee = F.length && F.get(0) === Z, te = vt.env("editor"); if (ee) { te && F.remove(); return } F.length && F.remove(), te || K.append(Z) } return d }) }); var gt = be((dn, mt) => { "use strict"; var jt = Ce(); jt.define("focus-visible", mt.exports = function () { function t(p) { var S = !0, K = !1, T = null, W = { text: !0, search: !0, url: !0, tel: !0, email: !0, password: !0, number: !0, date: !0, month: !0, week: !0, time: !0, datetime: !0, "datetime-local": !0 }; function M(E) { return !!(E && E !== document && E.nodeName !== "HTML" && E.nodeName !== "BODY" && "classList" in E && "contains" in E.classList) } function I(E) { var $ = E.type, z = E.tagName; return !!(z === "INPUT" && W[$] && !E.readOnly || z === "TEXTAREA" && !E.readOnly || E.isContentEditable) } function Z(E) { E.getAttribute("data-wf-focus-visible") || E.setAttribute("data-wf-focus-visible", "true") } function oe(E) { E.getAttribute("data-wf-focus-visible") && E.removeAttribute("data-wf-focus-visible") } function G(E) { E.metaKey || E.altKey || E.ctrlKey || (M(p.activeElement) && Z(p.activeElement), S = !0) } function J() { S = !1 } function F(E) { M(E.target) && (S || I(E.target)) && Z(E.target) } function ee(E) { M(E.target) && E.target.hasAttribute("data-wf-focus-visible") && (K = !0, window.clearTimeout(T), T = window.setTimeout(function () { K = !1 }, 100), oe(E.target)) } function te() { document.visibilityState === "hidden" && (K && (S = !0), Q()) } function Q() { document.addEventListener("mousemove", D), document.addEventListener("mousedown", D), document.addEventListener("mouseup", D), document.addEventListener("pointermove", D), document.addEventListener("pointerdown", D), document.addEventListener("pointerup", D), document.addEventListener("touchmove", D), document.addEventListener("touchstart", D), document.addEventListener("touchend", D) } function U() { document.removeEventListener("mousemove", D), document.removeEventListener("mousedown", D), document.removeEventListener("mouseup", D), document.removeEventListener("pointermove", D), document.removeEventListener("pointerdown", D), document.removeEventListener("pointerup", D), document.removeEventListener("touchmove", D), document.removeEventListener("touchstart", D), document.removeEventListener("touchend", D) } function D(E) { E.target.nodeName && E.target.nodeName.toLowerCase() === "html" || (S = !1, U()) } document.addEventListener("keydown", G, !0), document.addEventListener("mousedown", J, !0), document.addEventListener("pointerdown", J, !0), document.addEventListener("touchstart", J, !0), document.addEventListener("visibilitychange", te, !0), Q(), p.addEventListener("focus", F, !0), p.addEventListener("blur", ee, !0) } function d() { if (typeof document < "u") try { document.querySelector(":focus-visible") } catch { t(document) } } return { ready: d } }) }); var yt = be((vn, bt) => { "use strict"; var wt = Ce(); wt.define("focus", bt.exports = function () { var t = [], d = !1; function p(W) { d && (W.preventDefault(), W.stopPropagation(), W.stopImmediatePropagation(), t.unshift(W)) } function S(W) { var M = W.target, I = M.tagName; return /^a$/i.test(I) && M.href != null || /^(button|textarea)$/i.test(I) && M.disabled !== !0 || /^input$/i.test(I) && /^(button|reset|submit|radio|checkbox)$/i.test(M.type) && !M.disabled || !/^(button|input|textarea|select|a)$/i.test(I) && !Number.isNaN(Number.parseFloat(M.tabIndex)) || /^audio$/i.test(I) || /^video$/i.test(I) && M.controls === !0 } function K(W) { S(W) && (d = !0, setTimeout(() => { for (d = !1, W.target.focus(); t.length > 0;) { var M = t.pop(); M.target.dispatchEvent(new MouseEvent(M.type, M)) } }, 0)) } function T() { typeof document < "u" && document.body.hasAttribute("data-wf-focus-within") && wt.env.safari && (document.addEventListener("mousedown", K, !0), document.addEventListener("mouseup", p, !0), document.addEventListener("click", p, !0)) } return { ready: T } }) }); var xt = be((hn, Et) => { "use strict"; var qe = Ce(); qe.define("links", Et.exports = function (t, d) { var p = {}, S = t(window), K, T = qe.env(), W = window.location, M = document.createElement("a"), I = "w--current", Z = /index\.(html|php)$/, oe = /\/$/, G, J; p.ready = p.design = p.preview = F; function F() { K = T && qe.env("design"), J = qe.env("slug") || W.pathname || "", qe.scroll.off(te), G = []; for (var U = document.links, D = 0; D < U.length; ++D)ee(U[D]); G.length && (qe.scroll.on(te), te()) } function ee(U) { if (!U.getAttribute("hreflang")) { var D = K && U.getAttribute("href-disabled") || U.getAttribute("href"); if (M.href = D, !(D.indexOf(":") >= 0)) { var E = t(U); if (M.hash.length > 1 && M.host + M.pathname === W.host + W.pathname) { if (!/^#[a-zA-Z0-9\-\_]+$/.test(M.hash)) return; var $ = t(M.hash); $.length && G.push({ link: E, sec: $, active: !1 }); return } if (!(D === "#" || D === "")) { var z = M.href === W.href || D === J || Z.test(D) && oe.test(J); Q(E, I, z) } } } } function te() { var U = S.scrollTop(), D = S.height(); d.each(G, function (E) { if (!E.link.attr("hreflang")) { var $ = E.link, z = E.sec, Y = z.offset().top, ue = z.outerHeight(), fe = D * .5, pe = z.is(":visible") && Y + ue - fe >= U && Y + fe <= U + D; E.active !== pe && (E.active = pe, Q($, I, pe)) } }) } function Q(U, D, E) { var $ = U.hasClass(D); E && $ || !E && !$ || (E ? U.addClass(D) : U.removeClass(D)) } return p }) }); var _t = be((pn, kt) => { "use strict"; var $e = Ce(); $e.define("scroll", kt.exports = function (t) { var d = { WF_CLICK_EMPTY: "click.wf-empty-link", WF_CLICK_SCROLL: "click.wf-scroll" }, p = window.location, S = ee() ? null : window.history, K = t(window), T = t(document), W = t(document.body), M = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (y) { window.setTimeout(y, 15) }, I = $e.env("editor") ? ".w-editor-body" : "body", Z = "header, " + I + " > .header, " + I + " > .w-nav:not([data-no-scroll])", oe = 'a[href="#"]', G = 'a[href*="#"]:not(.w-tab-link):not(' + oe + ")", J = '.wf-force-outline-none[tabindex="-1"]:focus{outline:none;}', F = document.createElement("style"); F.appendChild(document.createTextNode(J)); function ee() { try { return !!window.frameElement } catch { return !0 } } var te = /^#[a-zA-Z0-9][\w:.-]*$/; function Q(y) { return te.test(y.hash) && y.host + y.pathname === p.host + p.pathname } let U = typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)"); function D() { return document.body.getAttribute("data-wf-scroll-motion") === "none" || U.matches } function E(y, l) { var v; switch (l) { case "add": v = y.attr("tabindex"), v ? y.attr("data-wf-tabindex-swap", v) : y.attr("tabindex", "-1"); break; case "remove": v = y.attr("data-wf-tabindex-swap"), v ? (y.attr("tabindex", v), y.removeAttr("data-wf-tabindex-swap")) : y.removeAttr("tabindex"); break }y.toggleClass("wf-force-outline-none", l === "add") } function $(y) { var l = y.currentTarget; if (!($e.env("design") || window.$.mobile && /(?:^|\s)ui-link(?:$|\s)/.test(l.className))) { var v = Q(l) ? l.hash : ""; if (v !== "") { var L = t(v); L.length && (y && (y.preventDefault(), y.stopPropagation()), z(v, y), window.setTimeout(function () { Y(L, function () { E(L, "add"), L.get(0).focus({ preventScroll: !0 }), E(L, "remove") }) }, y ? 0 : 300)) } } } function z(y) { if (p.hash !== y && S && S.pushState && !($e.env.chrome && p.protocol === "file:")) { var l = S.state && S.state.hash; l !== y && S.pushState({ hash: y }, "", y) } } function Y(y, l) { var v = K.scrollTop(), L = ue(y); if (v !== L) { var _ = fe(y, v, L), q = Date.now(), N = function () { var f = Date.now() - q; window.scroll(0, pe(v, L, f, _)), f <= _ ? M(N) : typeof l == "function" && l() }; M(N) } } function ue(y) { var l = t(Z), v = l.css("position") === "fixed" ? l.outerHeight() : 0, L = y.offset().top - v; if (y.data("scroll") === "mid") { var _ = K.height() - v, q = y.outerHeight(); q < _ && (L -= Math.round((_ - q) / 2)) } return L } function fe(y, l, v) { if (D()) return 0; var L = 1; return W.add(y).each(function (_, q) { var N = parseFloat(q.getAttribute("data-scroll-time")); !isNaN(N) && N >= 0 && (L = N) }), (472.143 * Math.log(Math.abs(l - v) + 125) - 2e3) * L } function pe(y, l, v, L) { return v > L ? l : y + (l - y) * Ee(v / L) } function Ee(y) { return y < .5 ? 4 * y * y * y : (y - 1) * (2 * y - 2) * (2 * y - 2) + 1 } function he() { var { WF_CLICK_EMPTY: y, WF_CLICK_SCROLL: l } = d; T.on(l, G, $), T.on(y, oe, function (v) { v.preventDefault() }), document.head.insertBefore(F, document.head.firstChild) } return { ready: he } }) }); var At = be((mn, Ot) => { "use strict"; var Jt = Ce(); Jt.define("touch", Ot.exports = function (t) { var d = {}, p = window.getSelection; t.event.special.tap = { bindType: "click", delegateType: "click" }, d.init = function (T) { return T = typeof T == "string" ? t(T).get(0) : T, T ? new S(T) : null }; function S(T) { var W = !1, M = !1, I = Math.min(Math.round(window.innerWidth * .04), 40), Z, oe; T.addEventListener("touchstart", G, !1), T.addEventListener("touchmove", J, !1), T.addEventListener("touchend", F, !1), T.addEventListener("touchcancel", ee, !1), T.addEventListener("mousedown", G, !1), T.addEventListener("mousemove", J, !1), T.addEventListener("mouseup", F, !1), T.addEventListener("mouseout", ee, !1); function G(Q) { var U = Q.touches; U && U.length > 1 || (W = !0, U ? (M = !0, Z = U[0].clientX) : Z = Q.clientX, oe = Z) } function J(Q) { if (W) { if (M && Q.type === "mousemove") { Q.preventDefault(), Q.stopPropagation(); return } var U = Q.touches, D = U ? U[0].clientX : Q.clientX, E = D - oe; oe = D, Math.abs(E) > I && p && String(p()) === "" && (K("swipe", Q, { direction: E > 0 ? "right" : "left" }), ee()) } } function F(Q) { if (W && (W = !1, M && Q.type === "mouseup")) { Q.preventDefault(), Q.stopPropagation(), M = !1; return } } function ee() { W = !1 } function te() { T.removeEventListener("touchstart", G, !1), T.removeEventListener("touchmove", J, !1), T.removeEventListener("touchend", F, !1), T.removeEventListener("touchcancel", ee, !1), T.removeEventListener("mousedown", G, !1), T.removeEventListener("mousemove", J, !1), T.removeEventListener("mouseup", F, !1), T.removeEventListener("mouseout", ee, !1), T = null } this.destroy = te } function K(T, W, M) { var I = t.Event(T, { originalEvent: W }); t(W.target).trigger(I, M) } return d.instance = d.init(document), d }) }); var Ct = be((gn, Tt) => { "use strict"; var Je = window.jQuery, Re = {}, Ke = [], Lt = ".w-ix", Xe = { reset: function (t, d) { d.__wf_intro = null }, intro: function (t, d) { d.__wf_intro || (d.__wf_intro = !0, Je(d).triggerHandler(Re.types.INTRO)) }, outro: function (t, d) { d.__wf_intro && (d.__wf_intro = null, Je(d).triggerHandler(Re.types.OUTRO)) } }; Re.triggers = {}; Re.types = { INTRO: "w-ix-intro" + Lt, OUTRO: "w-ix-outro" + Lt }; Re.init = function () { for (var t = Ke.length, d = 0; d < t; d++) { var p = Ke[d]; p[0](0, p[1]) } Ke = [], Je.extend(Re.triggers, Xe) }; Re.async = function () { for (var t in Xe) { var d = Xe[t]; Xe.hasOwnProperty(t) && (Re.triggers[t] = function (p, S) { Ke.push([d, S]) }) } }; Re.async(); Tt.exports = Re }); var tt = be((wn, It) => { "use strict"; var et = Ct(); function Rt(t, d) { var p = document.createEvent("CustomEvent"); p.initCustomEvent(d, !0, !0, null), t.dispatchEvent(p) } var en = window.jQuery, Ve = {}, St = ".w-ix", tn = { reset: function (t, d) { et.triggers.reset(t, d) }, intro: function (t, d) { et.triggers.intro(t, d), Rt(d, "COMPONENT_ACTIVE") }, outro: function (t, d) { et.triggers.outro(t, d), Rt(d, "COMPONENT_INACTIVE") } }; Ve.triggers = {}; Ve.types = { INTRO: "w-ix-intro" + St, OUTRO: "w-ix-outro" + St }; en.extend(Ve.triggers, tn); It.exports = Ve }); var Ft = be((bn, Dt) => { "use strict"; var Pe = Ce(), nn = tt(), Ae = { ARROW_LEFT: 37, ARROW_UP: 38, ARROW_RIGHT: 39, ARROW_DOWN: 40, ESCAPE: 27, SPACE: 32, ENTER: 13, HOME: 36, END: 35 }, Mt = !0, rn = /^#[a-zA-Z0-9\-_]+$/; Pe.define("dropdown", Dt.exports = function (t, d) { var p = d.debounce, S = {}, K = Pe.env(), T = !1, W, M = Pe.env.touch, I = ".w-dropdown", Z = "w--open", oe = nn.triggers, G = 900, J = "focusout" + I, F = "keydown" + I, ee = "mouseenter" + I, te = "mousemove" + I, Q = "mouseleave" + I, U = (M ? "click" : "mouseup") + I, D = "w-close" + I, E = "setting" + I, $ = t(document), z; S.ready = Y, S.design = function () { T && l(), T = !1, Y() }, S.preview = function () { T = !0, Y() }; function Y() { W = K && Pe.env("design"), z = $.find(I), z.each(ue) } function ue(r, b) { var x = t(b), c = t.data(b, I); c || (c = t.data(b, I, { open: !1, el: x, config: {}, selectedIdx: -1 })), c.toggle = c.el.children(".w-dropdown-toggle"), c.list = c.el.children(".w-dropdown-list"), c.links = c.list.find("a:not(.w-dropdown .w-dropdown a)"), c.complete = _(c), c.mouseLeave = N(c), c.mouseUpOutside = L(c), c.mouseMoveOutside = f(c), fe(c); var B = c.toggle.attr("id"), le = c.list.attr("id"); B || (B = "w-dropdown-toggle-" + r), le || (le = "w-dropdown-list-" + r), c.toggle.attr("id", B), c.toggle.attr("aria-controls", le), c.toggle.attr("aria-haspopup", "menu"), c.toggle.attr("aria-expanded", "false"), c.toggle.find(".w-icon-dropdown-toggle").attr("aria-hidden", "true"), c.toggle.prop("tagName") !== "BUTTON" && (c.toggle.attr("role", "button"), c.toggle.attr("tabindex") || c.toggle.attr("tabindex", "0")), c.list.attr("id", le), c.list.attr("aria-labelledby", B), c.links.each(function (n, m) { m.hasAttribute("tabindex") || m.setAttribute("tabindex", "0"), rn.test(m.hash) && m.addEventListener("click", y.bind(null, c)) }), c.el.off(I), c.toggle.off(I), c.nav && c.nav.off(I); var V = Ee(c, Mt); W && c.el.on(E, pe(c)), W || (K && (c.hovering = !1, y(c)), c.config.hover && c.toggle.on(ee, q(c)), c.el.on(D, V), c.el.on(F, O(c)), c.el.on(J, h(c)), c.toggle.on(U, V), c.toggle.on(F, g(c)), c.nav = c.el.closest(".w-nav"), c.nav.on(D, V)) } function fe(r) { var b = Number(r.el.css("z-index")); r.manageZ = b === G || b === G + 1, r.config = { hover: r.el.attr("data-hover") === "true" && !M, delay: r.el.attr("data-delay") } } function pe(r) { return function (b, x) { x = x || {}, fe(r), x.open === !0 && he(r, !0), x.open === !1 && y(r, { immediate: !0 }) } } function Ee(r, b) { return p(function (x) { if (r.open || x && x.type === "w-close") return y(r, { forceClose: b }); he(r) }) } function he(r) { if (!r.open) { v(r), r.open = !0, r.list.addClass(Z), r.toggle.addClass(Z), r.toggle.attr("aria-expanded", "true"), oe.intro(0, r.el[0]), Pe.redraw.up(), r.manageZ && r.el.css("z-index", G + 1); var b = Pe.env("editor"); W || $.on(U, r.mouseUpOutside), r.hovering && !b && r.el.on(Q, r.mouseLeave), r.hovering && b && $.on(te, r.mouseMoveOutside), window.clearTimeout(r.delayId) } } function y(r, { immediate: b, forceClose: x } = {}) { if (r.open && !(r.config.hover && r.hovering && !x)) { r.toggle.attr("aria-expanded", "false"), r.open = !1; var c = r.config; if (oe.outro(0, r.el[0]), $.off(U, r.mouseUpOutside), $.off(te, r.mouseMoveOutside), r.el.off(Q, r.mouseLeave), window.clearTimeout(r.delayId), !c.delay || b) return r.complete(); r.delayId = window.setTimeout(r.complete, c.delay) } } function l() { $.find(I).each(function (r, b) { t(b).triggerHandler(D) }) } function v(r) { var b = r.el[0]; z.each(function (x, c) { var B = t(c); B.is(b) || B.has(b).length || B.triggerHandler(D) }) } function L(r) { return r.mouseUpOutside && $.off(U, r.mouseUpOutside), p(function (b) { if (r.open) { var x = t(b.target); if (!x.closest(".w-dropdown-toggle").length) { var c = t.inArray(r.el[0], x.parents(I)) === -1, B = Pe.env("editor"); if (c) { if (B) { var le = x.parents().length === 1 && x.parents("svg").length === 1, V = x.parents(".w-editor-bem-EditorHoverControls").length; if (le || V) return } y(r) } } } }) } function _(r) { return function () { r.list.removeClass(Z), r.toggle.removeClass(Z), r.manageZ && r.el.css("z-index", "") } } function q(r) { return function () { r.hovering = !0, he(r) } } function N(r) { return function () { r.hovering = !1, r.links.is(":focus") || y(r) } } function f(r) { return p(function (b) { if (r.open) { var x = t(b.target), c = t.inArray(r.el[0], x.parents(I)) === -1; if (c) { var B = x.parents(".w-editor-bem-EditorHoverControls").length, le = x.parents(".w-editor-bem-RTToolbar").length, V = t(".w-editor-bem-EditorOverlay"), n = V.find(".w-editor-edit-outline").length || V.find(".w-editor-bem-RTToolbar").length; if (B || le || n) return; r.hovering = !1, y(r) } } }) } function O(r) { return function (b) { if (!(W || !r.open)) switch (r.selectedIdx = r.links.index(document.activeElement), b.keyCode) { case Ae.HOME: return r.open ? (r.selectedIdx = 0, A(r), b.preventDefault()) : void 0; case Ae.END: return r.open ? (r.selectedIdx = r.links.length - 1, A(r), b.preventDefault()) : void 0; case Ae.ESCAPE: return y(r), r.toggle.focus(), b.stopPropagation(); case Ae.ARROW_RIGHT: case Ae.ARROW_DOWN: return r.selectedIdx = Math.min(r.links.length - 1, r.selectedIdx + 1), A(r), b.preventDefault(); case Ae.ARROW_LEFT: case Ae.ARROW_UP: return r.selectedIdx = Math.max(-1, r.selectedIdx - 1), A(r), b.preventDefault() } } } function A(r) { r.links[r.selectedIdx] && r.links[r.selectedIdx].focus() } function g(r) { var b = Ee(r, Mt); return function (x) { if (!W) { if (!r.open) switch (x.keyCode) { case Ae.ARROW_UP: case Ae.ARROW_DOWN: return x.stopPropagation() }switch (x.keyCode) { case Ae.SPACE: case Ae.ENTER: return b(), x.stopPropagation(), x.preventDefault() } } } } function h(r) { return p(function (b) { var { relatedTarget: x, target: c } = b, B = r.el[0], le = B.contains(x) || B.contains(c); return le || y(r), b.stopPropagation() }) } return S }) }); var Nt = be((yn, Pt) => { "use strict"; var nt = Ce(); nt.define("forms", Pt.exports = function (t, d) { var p = {}, S = t(document), K, T = window.location, W = window.XDomainRequest && !window.atob, M = ".w-form", I, Z = /e(-)?mail/i, oe = /^\S+@\S+$/, G = window.alert, J = nt.env(), F, ee, te, Q = /list-manage[1-9]?.com/i, U = d.debounce(function () { G("Oops! This page has improperly configured forms. Please contact your website administrator to fix this issue.") }, 100); p.ready = p.design = p.preview = function () { D(), !J && !F && $() }; function D() { I = t("html").attr("data-wf-site"), ee = "https://webflow.com/api/v1/form/" + I, W && ee.indexOf("https://webflow.com") >= 0 && (ee = ee.replace("https://webflow.com", "https://formdata.webflow.com")), te = `${ee}/signFile`, K = t(M + " form"), K.length && K.each(E) } function E(f, O) { var A = t(O), g = t.data(O, M); g || (g = t.data(O, M, { form: A })), z(g); var h = A.closest("div.w-form"); g.done = h.find("> .w-form-done"), g.fail = h.find("> .w-form-fail"), g.fileUploads = h.find(".w-file-upload"), g.fileUploads.each(function (x) { _(x, g) }); var r = g.form.attr("aria-label") || g.form.attr("data-name") || "Form"; g.done.attr("aria-label") || g.form.attr("aria-label", r), g.done.attr("tabindex", "-1"), g.done.attr("role", "region"), g.done.attr("aria-label") || g.done.attr("aria-label", r + " success"), g.fail.attr("tabindex", "-1"), g.fail.attr("role", "region"), g.fail.attr("aria-label") || g.fail.attr("aria-label", r + " failure"); var b = g.action = A.attr("action"); if (g.handler = null, g.redirect = A.attr("data-redirect"), Q.test(b)) { g.handler = l; return } if (!b) { if (I) { g.handler = y; return } U() } } function $() { F = !0, S.on("submit", M + " form", function (x) { var c = t.data(this, M); c.handler && (c.evt = x, c.handler(c)) }); let f = ".w-checkbox-input", O = ".w-radio-input", A = "w--redirected-checked", g = "w--redirected-focus", h = "w--redirected-focus-visible", r = ":focus-visible, [data-wf-focus-visible]", b = [["checkbox", f], ["radio", O]]; S.on("change", M + ' form input[type="checkbox"]:not(' + f + ")", x => { t(x.target).siblings(f).toggleClass(A) }), S.on("change", M + ' form input[type="radio"]', x => { t(`input[name="${x.target.name}"]:not(${f})`).map((B, le) => t(le).siblings(O).removeClass(A)); let c = t(x.target); c.hasClass("w-radio-input") || c.siblings(O).addClass(A) }), b.forEach(([x, c]) => { S.on("focus", M + ` form input[type="${x}"]:not(` + c + ")", B => { t(B.target).siblings(c).addClass(g), t(B.target).filter(r).siblings(c).addClass(h) }), S.on("blur", M + ` form input[type="${x}"]:not(` + c + ")", B => { t(B.target).siblings(c).removeClass(`${g} ${h}`) }) }) } function z(f) { var O = f.btn = f.form.find(':input[type="submit"]'); f.wait = f.btn.attr("data-wait") || null, f.success = !1, O.prop("disabled", !1), f.label && O.val(f.label) } function Y(f) { var O = f.btn, A = f.wait; O.prop("disabled", !0), A && (f.label = O.val(), O.val(A)) } function ue(f, O) { var A = null; return O = O || {}, f.find(':input:not([type="submit"]):not([type="file"])').each(function (g, h) { var r = t(h), b = r.attr("type"), x = r.attr("data-name") || r.attr("name") || "Field " + (g + 1); x = encodeURIComponent(x); var c = r.val(); if (b === "checkbox") c = r.is(":checked"); else if (b === "radio") { if (O[x] === null || typeof O[x] == "string") return; c = f.find('input[name="' + r.attr("name") + '"]:checked').val() || null } typeof c == "string" && (c = t.trim(c)), O[x] = c, A = A || he(r, b, x, c) }), A } function fe(f) { var O = {}; return f.find(':input[type="file"]').each(function (A, g) { var h = t(g), r = h.attr("data-name") || h.attr("name") || "File " + (A + 1), b = h.attr("data-value"); typeof b == "string" && (b = t.trim(b)), O[r] = b }), O } let pe = { _mkto_trk: "marketo" }; function Ee() { return document.cookie.split("; ").reduce(function (O, A) { let g = A.split("="), h = g[0]; if (h in pe) { let r = pe[h], b = g.slice(1).join("="); O[r] = b } return O }, {}) } function he(f, O, A, g) { var h = null; return O === "password" ? h = "Passwords cannot be submitted." : f.attr("required") ? g ? Z.test(f.attr("type")) && (oe.test(g) || (h = "Please enter a valid email address for: " + A)) : h = "Please fill out the required field: " + A : A === "g-recaptcha-response" && !g && (h = "Please confirm you\u2019re not a robot."), h } function y(f) { L(f), v(f) } function l(f) { z(f); var O = f.form, A = {}; if (/^https/.test(T.href) && !/^https/.test(f.action)) { O.attr("method", "post"); return } L(f); var g = ue(O, A); if (g) return G(g); Y(f); var h; d.each(A, function (c, B) { Z.test(B) && (A.EMAIL = c), /^((full[ _-]?)?name)$/i.test(B) && (h = c), /^(first[ _-]?name)$/i.test(B) && (A.FNAME = c), /^(last[ _-]?name)$/i.test(B) && (A.LNAME = c) }), h && !A.FNAME && (h = h.split(" "), A.FNAME = h[0], A.LNAME = A.LNAME || h[1]); var r = f.action.replace("/post?", "/post-json?") + "&c=?", b = r.indexOf("u=") + 2; b = r.substring(b, r.indexOf("&", b)); var x = r.indexOf("id=") + 3; x = r.substring(x, r.indexOf("&", x)), A["b_" + b + "_" + x] = "", t.ajax({ url: r, data: A, dataType: "jsonp" }).done(function (c) { f.success = c.result === "success" || /already/.test(c.msg), f.success || console.info("MailChimp error: " + c.msg), v(f) }).fail(function () { v(f) }) } function v(f) { var O = f.form, A = f.redirect, g = f.success; if (g && A) { nt.location(A); return } f.done.toggle(g), f.fail.toggle(!g), g ? f.done.focus() : f.fail.focus(), O.toggle(!g), z(f) } function L(f) { f.evt && f.evt.preventDefault(), f.evt = null } function _(f, O) { if (!O.fileUploads || !O.fileUploads[f]) return; var A, g = t(O.fileUploads[f]), h = g.find("> .w-file-upload-default"), r = g.find("> .w-file-upload-uploading"), b = g.find("> .w-file-upload-success"), x = g.find("> .w-file-upload-error"), c = h.find(".w-file-upload-input"), B = h.find(".w-file-upload-label"), le = B.children(), V = x.find(".w-file-upload-error-msg"), n = b.find(".w-file-upload-file"), m = b.find(".w-file-remove-link"), C = n.find(".w-file-upload-file-name"), k = V.attr("data-w-size-error"), ae = V.attr("data-w-type-error"), De = V.attr("data-w-generic-error"); if (J || B.on("click keydown", function (o) { o.type === "keydown" && o.which !== 13 && o.which !== 32 || (o.preventDefault(), c.click()) }), B.find(".w-icon-file-upload-icon").attr("aria-hidden", "true"), m.find(".w-icon-file-upload-remove").attr("aria-hidden", "true"), J) c.on("click", function (o) { o.preventDefault() }), B.on("click", function (o) { o.preventDefault() }), le.on("click", function (o) { o.preventDefault() }); else { m.on("click keydown", function (o) { if (o.type === "keydown") { if (o.which !== 13 && o.which !== 32) return; o.preventDefault() } c.removeAttr("data-value"), c.val(""), C.html(""), h.toggle(!0), b.toggle(!1), B.focus() }), c.on("change", function (o) { A = o.target && o.target.files && o.target.files[0], A && (h.toggle(!1), x.toggle(!1), r.toggle(!0), r.focus(), C.text(A.name), a() || Y(O), O.fileUploads[f].uploading = !0, q(A, i)) }); var Se = B.outerHeight(); c.height(Se), c.width(1) } function e(o) { var u = o.responseJSON && o.responseJSON.msg, R = De; typeof u == "string" && u.indexOf("InvalidFileTypeError") === 0 ? R = ae : typeof u == "string" && u.indexOf("MaxFileSizeError") === 0 && (R = k), V.text(R), c.removeAttr("data-value"), c.val(""), r.toggle(!1), h.toggle(!0), x.toggle(!0), x.focus(), O.fileUploads[f].uploading = !1, a() || z(O) } function i(o, u) { if (o) return e(o); var R = u.fileName, H = u.postData, se = u.fileId, w = u.s3Url; c.attr("data-value", se), N(w, H, A, R, s) } function s(o) { if (o) return e(o); r.toggle(!1), b.css("display", "inline-block"), b.focus(), O.fileUploads[f].uploading = !1, a() || z(O) } function a() { var o = O.fileUploads && O.fileUploads.toArray() || []; return o.some(function (u) { return u.uploading }) } } function q(f, O) { var A = new URLSearchParams({ name: f.name, size: f.size }); t.ajax({ type: "GET", url: `${te}?${A}`, crossDomain: !0 }).done(function (g) { O(null, g) }).fail(function (g) { O(g) }) } function N(f, O, A, g, h) { var r = new FormData; for (var b in O) r.append(b, O[b]); r.append("file", A, g), t.ajax({ type: "POST", url: f, data: r, processData: !1, contentType: !1 }).done(function () { h(null) }).fail(function (x) { h(x) }) } return p }) }); var qt = be((En, Wt) => { "use strict"; var Me = Ce(), on = tt(), me = { ARROW_LEFT: 37, ARROW_UP: 38, ARROW_RIGHT: 39, ARROW_DOWN: 40, ESCAPE: 27, SPACE: 32, ENTER: 13, HOME: 36, END: 35 }; Me.define("navbar", Wt.exports = function (t, d) { var p = {}, S = t.tram, K = t(window), T = t(document), W = d.debounce, M, I, Z, oe, G = Me.env(), J = '<div class="w-nav-overlay" data-wf-ignore />', F = ".w-nav", ee = "w--open", te = "w--nav-dropdown-open", Q = "w--nav-dropdown-toggle-open", U = "w--nav-dropdown-list-open", D = "w--nav-link-open", E = on.triggers, $ = t(); p.ready = p.design = p.preview = z, p.destroy = function () { $ = t(), Y(), I && I.length && I.each(Ee) }; function z() { Z = G && Me.env("design"), oe = Me.env("editor"), M = t(document.body), I = T.find(F), I.length && (I.each(pe), Y(), ue()) } function Y() { Me.resize.off(fe) } function ue() { Me.resize.on(fe) } function fe() { I.each(h) } function pe(n, m) { var C = t(m), k = t.data(m, F); k || (k = t.data(m, F, { open: !1, el: C, config: {}, selectedIdx: -1 })), k.menu = C.find(".w-nav-menu"), k.links = k.menu.find(".w-nav-link"), k.dropdowns = k.menu.find(".w-dropdown"), k.dropdownToggle = k.menu.find(".w-dropdown-toggle"), k.dropdownList = k.menu.find(".w-dropdown-list"), k.button = C.find(".w-nav-button"), k.container = C.find(".w-container"), k.overlayContainerId = "w-nav-overlay-" + n, k.outside = A(k); var ae = C.find(".w-nav-brand"); ae && ae.attr("href") === "/" && ae.attr("aria-label") == null && ae.attr("aria-label", "home"), k.button.attr("style", "-webkit-user-select: text;"), k.button.attr("aria-label") == null && k.button.attr("aria-label", "menu"), k.button.attr("role", "button"), k.button.attr("tabindex", "0"), k.button.attr("aria-controls", k.overlayContainerId), k.button.attr("aria-haspopup", "menu"), k.button.attr("aria-expanded", "false"), k.el.off(F), k.button.off(F), k.menu.off(F), l(k), Z ? (he(k), k.el.on("setting" + F, v(k))) : (y(k), k.button.on("click" + F, f(k)), k.menu.on("click" + F, "a", O(k)), k.button.on("keydown" + F, L(k)), k.el.on("keydown" + F, _(k))), h(n, m) } function Ee(n, m) { var C = t.data(m, F); C && (he(C), t.removeData(m, F)) } function he(n) { n.overlay && (V(n, !0), n.overlay.remove(), n.overlay = null) } function y(n) { n.overlay || (n.overlay = t(J).appendTo(n.el), n.overlay.attr("id", n.overlayContainerId), n.parent = n.menu.parent(), V(n, !0)) } function l(n) { var m = {}, C = n.config || {}, k = m.animation = n.el.attr("data-animation") || "default"; m.animOver = /^over/.test(k), m.animDirect = /left$/.test(k) ? -1 : 1, C.animation !== k && n.open && d.defer(N, n), m.easing = n.el.attr("data-easing") || "ease", m.easing2 = n.el.attr("data-easing2") || "ease"; var ae = n.el.attr("data-duration"); m.duration = ae != null ? Number(ae) : 400, m.docHeight = n.el.attr("data-doc-height"), n.config = m } function v(n) { return function (m, C) { C = C || {}; var k = K.width(); l(n), C.open === !0 && B(n, !0), C.open === !1 && V(n, !0), n.open && d.defer(function () { k !== K.width() && N(n) }) } } function L(n) { return function (m) { switch (m.keyCode) { case me.SPACE: case me.ENTER: return f(n)(), m.preventDefault(), m.stopPropagation(); case me.ESCAPE: return V(n), m.preventDefault(), m.stopPropagation(); case me.ARROW_RIGHT: case me.ARROW_DOWN: case me.HOME: case me.END: return n.open ? (m.keyCode === me.END ? n.selectedIdx = n.links.length - 1 : n.selectedIdx = 0, q(n), m.preventDefault(), m.stopPropagation()) : (m.preventDefault(), m.stopPropagation()) } } } function _(n) { return function (m) { if (n.open) switch (n.selectedIdx = n.links.index(document.activeElement), m.keyCode) { case me.HOME: case me.END: return m.keyCode === me.END ? n.selectedIdx = n.links.length - 1 : n.selectedIdx = 0, q(n), m.preventDefault(), m.stopPropagation(); case me.ESCAPE: return V(n), n.button.focus(), m.preventDefault(), m.stopPropagation(); case me.ARROW_LEFT: case me.ARROW_UP: return n.selectedIdx = Math.max(-1, n.selectedIdx - 1), q(n), m.preventDefault(), m.stopPropagation(); case me.ARROW_RIGHT: case me.ARROW_DOWN: return n.selectedIdx = Math.min(n.links.length - 1, n.selectedIdx + 1), q(n), m.preventDefault(), m.stopPropagation() } } } function q(n) { if (n.links[n.selectedIdx]) { var m = n.links[n.selectedIdx]; m.focus(), O(m) } } function N(n) { n.open && (V(n, !0), B(n, !0)) } function f(n) { return W(function () { n.open ? V(n) : B(n) }) } function O(n) { return function (m) { var C = t(this), k = C.attr("href"); if (!Me.validClick(m.currentTarget)) { m.preventDefault(); return } k && k.indexOf("#") === 0 && n.open && V(n) } } function A(n) { return n.outside && T.off("click" + F, n.outside), function (m) { var C = t(m.target); oe && C.closest(".w-editor-bem-EditorOverlay").length || g(n, C) } } var g = W(function (n, m) { if (n.open) { var C = m.closest(".w-nav-menu"); n.menu.is(C) || V(n) } }); function h(n, m) { var C = t.data(m, F), k = C.collapsed = C.button.css("display") !== "none"; if (C.open && !k && !Z && V(C, !0), C.container.length) { var ae = b(C); C.links.each(ae), C.dropdowns.each(ae) } C.open && le(C) } var r = "max-width"; function b(n) { var m = n.container.css(r); return m === "none" && (m = ""), function (C, k) { k = t(k), k.css(r, ""), k.css(r) === "none" && k.css(r, m) } } function x(n, m) { m.setAttribute("data-nav-menu-open", "") } function c(n, m) { m.removeAttribute("data-nav-menu-open") } function B(n, m) { if (n.open) return; n.open = !0, n.menu.each(x), n.links.addClass(D), n.dropdowns.addClass(te), n.dropdownToggle.addClass(Q), n.dropdownList.addClass(U), n.button.addClass(ee); var C = n.config, k = C.animation; (k === "none" || !S.support.transform || C.duration <= 0) && (m = !0); var ae = le(n), De = n.menu.outerHeight(!0), Se = n.menu.outerWidth(!0), e = n.el.height(), i = n.el[0]; if (h(0, i), E.intro(0, i), Me.redraw.up(), Z || T.on("click" + F, n.outside), m) { o(); return } var s = "transform " + C.duration + "ms " + C.easing; if (n.overlay && ($ = n.menu.prev(), n.overlay.show().append(n.menu)), C.animOver) { S(n.menu).add(s).set({ x: C.animDirect * Se, height: ae }).start({ x: 0 }).then(o), n.overlay && n.overlay.width(Se); return } var a = e + De; S(n.menu).add(s).set({ y: -a }).start({ y: 0 }).then(o); function o() { n.button.attr("aria-expanded", "true") } } function le(n) { var m = n.config, C = m.docHeight ? T.height() : M.height(); return m.animOver ? n.menu.height(C) : n.el.css("position") !== "fixed" && (C -= n.el.outerHeight(!0)), n.overlay && n.overlay.height(C), C } function V(n, m) { if (!n.open) return; n.open = !1, n.button.removeClass(ee); var C = n.config; if ((C.animation === "none" || !S.support.transform || C.duration <= 0) && (m = !0), E.outro(0, n.el[0]), T.off("click" + F, n.outside), m) { S(n.menu).stop(), i(); return } var k = "transform " + C.duration + "ms " + C.easing2, ae = n.menu.outerHeight(!0), De = n.menu.outerWidth(!0), Se = n.el.height(); if (C.animOver) { S(n.menu).add(k).start({ x: De * C.animDirect }).then(i); return } var e = Se + ae; S(n.menu).add(k).start({ y: -e }).then(i); function i() { n.menu.height(""), S(n.menu).set({ x: 0, y: 0 }), n.menu.each(c), n.links.removeClass(D), n.dropdowns.removeClass(te), n.dropdownToggle.removeClass(Q), n.dropdownList.removeClass(U), n.overlay && n.overlay.children().length && ($.length ? n.menu.insertAfter($) : n.menu.prependTo(n.parent), n.overlay.attr("style", "").hide()), n.el.triggerHandler("w-close"), n.button.attr("aria-expanded", "false") } } return p }) }); pt(); gt(); yt(); xt(); _t(); At(); Ft(); Nt(); qt();
})();


