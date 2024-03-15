import { RadixDappToolkit, DataRequestBuilder, RadixNetwork } from '@radixdlt/radix-dapp-toolkit'
// You can create a dApp definition in the dev console at https://stokenet-console.radixdlt.com/dapp-metadata 
// then use that account for your dAppId
const dAppId = 'account_tdx_2_12ys5dcytt0hc0yhq5a78stl7upchljsvs36ujdunlszlrgu90mz44d'
let stabIdAddress = "resource_tdx_2_1ntp46n7hp6w9ztapgemp03r02f0682apvkpsg8dspsqkqj7x76dh9u"
let componentAddress = "component_tdx_2_1cqwjl65pjzaa58np0ajh4kxwwnnfdzrdq8n6f78gw94q7njye8eu0p"
let poolComponentAddress = "component_tdx_2_1czu7msv4fx3c78f6fr3xyuw4pz02vfrksfzl83lxj5ldgdttptlgj0"
let stabAddress = "resource_tdx_2_1t5p29j5vlkgju9ccr5sy0q3mm42hs44vfeuya32k7ufjl6n29cenv0"
let cdpAddress = "resource_tdx_2_1ngqszg48fwc9e5wzfvvlp38q5x5y9p8ez0fvar6ddfatex8c67dma0"
let xrdAddress = "resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc"
let ilisAddress = "resource_tdx_2_1thyjkzx9kzwjvknj76qfh2zzpxhxzrc20nvn46tty2gm6c00tnmx4a"
let lpAddress = "resource_tdx_2_1t4w3svzhy9360j3dhtqqf3ampx8th52hj37jndj6p6vs0fdnjarn8u"
let liqAddress = "resource_tdx_2_1nt7s2zcqgmpl25qd0qumar6jcq0kfce7zn6qrz5gf6wyz8hkey2g60"
let markerAddress = "resource_tdx_2_1nft902qdfuu84kphlynkhu20dnhprkv6nux8w788rsafm57e9472h6"
let stakingAddress = "component_tdx_2_1cqmsc8ytyddml4j4gapmj7zyyuslnfe6y3ylt5j2y0rga5py2hktw4"
let accountAddress = "account_tdx_2_129kt8327ulqyq0ahdh74plu0r23qn9jugxppehggtp27m9n063heec"
let selectedText;
let xrdPrice;
let interestRate;
let stab_ids = [];
let cdp_ids = [];
let marker_ids = [];
let cdpAmountId;
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
let collateralAmount;
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
let warned = false;
let idSupplied = false;

const acceptedResources = [["Astrolescent LSU", "resource_tdx_2_1t5nr68djv90t3fk9ahqtw3q96ps8mhdsa5lcxgx6unqsj6xjavmpwh", "validator_tdx_2_1sdkarf3cr699ptgdlnyy6nhvelzvjla3kslhlghxcvpnkn3494ttlw", 1],
["Radst0kes LSU", "resource_tdx_2_1tkwt5yn34qkk9lppyjmej8dulmfgaggx954yqz28ffpgn58pvfz04y", "validator_tdx_2_1s0hly3nphfkcztjjyfyn7juxyeev523fkrrzpk9ud4e47eut4zrmp7", 1],
["Hermes LSU", "resource_tdx_2_1thydcf5zxpp20us8jka3p02ryzudndm82603j306zry8gr23p2s3mu", "validator_tdx_2_1s0j35ansmur5q8kxem4edr23j2leutupveqc9g8kuuj29wc7uvmd8z", 1]]

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

    // If the resource was found, return the name
    if (resource) {
        return resource[0];
    }

    // If the resource was not found, return an empty string or any default value
    return 'XRD';
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
rdt.walletApi.setRequestData(DataRequestBuilder.accounts().atLeast(1))

function update() {
    // Subscribe to updates to the user's shared wallet data
    rdt.walletApi.walletData$.subscribe((walletData) => {
        console.log("subscription wallet data: ", walletData)
        if (walletData && walletData.accounts && walletData.accounts.length > 0) {
            accountAddress = walletData.accounts[0].address;
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
                    amount: amount
                };
            });

            // Sort the array by amount in descending order
            resourceAddressesAndAmounts.sort((a, b) => b.amount - a.amount);

            return resourceAddressesAndAmounts;
        }

        const url_fetch_ids = "https://stokenet.radixdlt.com/state/entity/details";
        const addresses = [accountAddress, componentAddress, poolComponentAddress, stakingAddress, stabAddress]; // Replace with your addresses
        const url_fetch_amount = "https://stokenet.radixdlt.com/state/entity/page/fungible-vaults/";
        const requestStab = {
            "address": poolComponentAddress,
            "resource_address": stabAddress
        };

        const requestXrd = {
            "address": poolComponentAddress,
            "resource_address": xrdAddress
        };

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
            const response = await fetch(url_fetch_ids, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            let sortedItems = [];

            addresses.forEach(address => {
                let item = data.items.find(item => item.address === address);
                if (item) {
                    sortedItems.push(item);
                }
            });
            return sortedItems;
        }

        function useData(data) {
            console.log(data);
            internalPrice = data[1].details.state.fields[11].value;
            xrdPrice = data[1].details.state.fields[19].value;
            stabXrdRatio = internalPrice / xrdPrice;
            validatorMultiplier = 1;
            if (window.location.pathname === '/open-cdp.html') {

                getFungibleResources(accountAddress).then(resourceAddressesAndAmounts => {
                    const selectElement = document.getElementById('collateral-select');
                    selectElement.innerHTML = '';
                    const xrd_option = document.createElement('option');
                    xrd_option.text = 'XRD';
                    xrd_option.value = "link1";
                    xrd_option.setAttribute('identifier', "XRD");
                    selectElement.add(xrd_option);

                    // Add new options
                    resourceAddressesAndAmounts.forEach(resource => {
                        const option = document.createElement('option');
                        option.text = resource.name;
                        option.value = resource.resourceAddress;
                        option.setAttribute('identifier', "LSU");
                        selectElement.add(option);
                    });
                });

                document.getElementById("outputStab").innerHTML = customRound(((1 / stabXrdRatio) / 2.5));
                console.log(stabXrdRatio);
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
            currentPeriod = data[3].details.state.fields[3].value;
            let cdpRewards = data[3].details.state.fields[4].value;
            let lpRewards = data[3].details.state.fields[5].value;
            let stakeRewards = data[3].details.state.fields[6].value;
            let updateRewards = data[1].details.state.fields[30].value;
            walletIlis = getResourceAmount(ilisAddress, data, 0);
            walletXrd = getResourceAmount(xrdAddress, data, 0);
            walletLp = getResourceAmount(lpAddress, data, 0);
            walletStab = getResourceAmount(stabAddress, data, 0);
            xrdPoolAmount = getResourceAmount(xrdAddress, data, 2);
            stabPoolAmount = getResourceAmount(stabAddress, data, 2);
            xrdPrice = data[1].details.state.fields[19].value;
            interestRate = (100 * ((data[1].details.state.fields[13].value ** (24 * 60 * 365)) - 1)).toFixed(2);

            if (window.location.pathname === '/dashboard.html') {
                document.getElementById('ilis-staking-rewards').textContent = stakeRewards + " ILIS/week";
                document.getElementById('lpstab-staking-rewards').textContent = lpRewards + " ILIS/week";
                document.getElementById('stab-debt-rewards').textContent = cdpRewards + " ILIS/week";
                document.getElementById('update-rewards').textContent = updateRewards + " ILIS/week";
            }

            if (window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname === '/secret_index.html') {
                document.getElementById('interest-rate').textContent = interestRate;
                document.getElementById('circulating-counter').textContent = (1 * data[4].details.total_supply).toFixed(0);
                document.getElementById('price-counter').textContent = (xrdPrice * stabXrdRatio).toFixed(2);
            }

            if (window.location.pathname === '/swap.html') {
                document.getElementById('swap-sell-amount').textContent = "max. " + (Math.floor((walletXrd) * 10) / 10).toLocaleString('en-US');
                formattedWallet = (Math.floor(walletXrd * 10) / 10);
                formattedProvideStab = (Math.floor((walletStab) * 10) / 10); cdp_ids
                formattedRemoveLp = (Math.floor(walletLp * 10) / 10);
                document.getElementById('internal-price-xrd').innerHTML = stabXrdRatio.toFixed(2) + " XRD";
                document.getElementById('internal-price-usd').innerHTML = "$" + (stabXrdRatio * xrdPrice).toFixed(2);
                document.getElementById('market-price-xrd').innerHTML = (xrdPoolAmount / stabPoolAmount).toFixed(2) + " XRD";
                document.getElementById('market-price-usd').innerHTML = "$" + ((xrdPoolAmount / stabPoolAmount) * xrdPrice).toFixed(2);
                document.getElementById('interest-rate').innerHTML = interestRate + "%/year";
                if (stabXrdRatio * xrdPrice > 1.005 * xrdPrice * xrdPoolAmount / stabPoolAmount) {
                    document.getElementById("recommendation").innerHTML = `<strong>Market price &gt; Internal price</strong>, sell XRD to arbitrage!`;
                } else if (stabXrdRatio * xrdPrice < 0.995 * xrdPrice * xrdPoolAmount / stabPoolAmount) {
                    document.getElementById("recommendation").innerHTML = `<strong>Market price &lt; Internal price</strong>, sell STAB to arbitrage!`;
                }
                else {
                    document.getElementById("priceErrorExp").innerHTML = `Price error is within acceptable bounds. Minimal arbitrage opportunities.`;
                }
                document.getElementById('provide-xrd-amount').textContent = "max. " + (Math.floor(walletXrd * 10) / 10).toLocaleString('en-US');
                if (walletStab >= 0.1) {
                    document.getElementById('provide-stab-amount').textContent = "max. " + (Math.floor((walletStab - 0.1) * 10) / 10).toLocaleString('en-US');
                } else {
                    document.getElementById('provide-stab-amount').textContent = "max. " + 0;
                }
                document.getElementById('remove-lp-amount').textContent = "max. " + (Math.floor(walletLp * 10) / 10).toLocaleString('en-US');
            }

            if (window.location.pathname === '/update.html') {
                marker_ids.forEach(id => {
                    // Get the dropdown element
                    let dropdown = document.getElementById('marker-select');

                    // Create a new option element
                    let option = document.createElement('option');

                    // Set the value and text of the option
                    option.value = id;
                    option.text = "Liq. marker " + id;

                    // Add the option to the dropdown
                    dropdown.add(option);
                });
            }

            if (window.location.pathname === '/dashboard.html' || window.location.pathname === '/open-cdp.html') {
                // Assuming cdp_ids is your array of ids
                stab_ids.forEach(id => {
                    // Get the dropdown element
                    let dropdown = document.getElementById('id-select');

                    // Create a new option element
                    let option = document.createElement('option');

                    // Set the value and text of the option
                    option.value = id;
                    option.text = "Activity ID " + id;

                    // Add the option to the dropdown
                    dropdown.add(option);
                });

                document.getElementById('interest-rate').textContent = interestRate + "%";
                document.getElementById('circulating-stab').textContent = (1 * data[4].details.total_supply).toFixed(0);
                document.getElementById('stab-internal-price').textContent = "$" + (xrdPrice * stabXrdRatio).toFixed(2);
                document.getElementById('stab-market-price').textContent = "$" + (xrdPrice * xrdPoolAmount / stabPoolAmount).toFixed(2);
            }

            if (window.location.pathname === '/manage-cdps.html') {
                // Assuming cdp_ids is your array of ids
                cdp_ids.forEach(id => {
                    // Get the dropdown element
                    let dropdown = document.getElementById('cdp-select');

                    // Create a new option element
                    let option = document.createElement('option');

                    // Set the value and text of the option
                    option.value = id;
                    option.text = "Loan receipt " + id;

                    // Add the option to the dropdown
                    dropdown.add(option);
                });
            }
        }

        fetchData().then(data => {
            useData(data);
        }).catch(e => {
            console.error('Error:', e);
        });
    })
}

update();

if (window.location.pathname === '/swap.html') {
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
        inputFieldProvideStab.value = formattedProvideStab;
        inputFieldProvideXrd.value = (inputFieldProvideStab.value * (xrdPoolAmount / stabPoolAmount)).toFixed(1);
    });
    removeMaxLp.addEventListener('click', function () {
        inputFieldRemoveLp.value = formattedRemoveLp;
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
        const result = await rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
        if (result.isErr()) throw result.error
        console.log("Swap sendTransaction Result: ", result.value)

        let requestBody = {
            "addresses": [poolComponentAddress],
            "aggregation_level": "Vault",
            "opt_ins": {
                "ancestor_identities": true,
                "component_royalty_vault_balance": true,
                "package_royalty_vault_balance": true,
                "non_fungible_include_nfids": true,
                "explicit_metadata": []
            }
        };

        fetch('https://stokenet.radixdlt.com/state/entity/details', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => {
                stabPoolAmount = getResourceAmount(stabAddress, data.items, 0);
                xrdPoolAmount = getResourceAmount(xrdAddress, data.items, 0);
                document.getElementById('internal-price-xrd').innerHTML = stabXrdRatio.toFixed(2) + " XRD";
                document.getElementById('internal-price-usd').innerHTML = "$" + (stabXrdRatio * xrdPrice).toFixed(2);
                document.getElementById('market-price-xrd').innerHTML = (xrdPoolAmount / stabPoolAmount).toFixed(2) + " XRD";
                document.getElementById('market-price-usd').innerHTML = "$" + ((xrdPoolAmount / stabPoolAmount) * xrdPrice).toFixed(2);
                document.getElementById('interest-rate').innerHTML = interestRate + "%/year";
                if (stabXrdRatio * xrdPrice > 1.005 * xrdPrice * xrdPoolAmount / stabPoolAmount) {
                    document.getElementById("recommendation").innerHTML = `<strong>Market price &lt; Internal price</strong>, sell XRD to arbitrage!`;
                } else if (stabXrdRatio * xrdPrice < 0.995 * xrdPrice * xrdPoolAmount / stabPoolAmount) {
                    document.getElementById("recommendation").innerHTML = `<strong>Market price &gt; Internal price</strong>, sell STAB to arbitrage!`;
                }
                else {
                    document.getElementById("priceErrorExp").innerHTML = `Price error is within acceptable bounds. Minimal arbitrage opportunities.`;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        update();
    }

    // *********** Add liq ***********
    document.getElementById('provide').onclick = async function () {
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
        const result = await rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
        if (result.isErr()) throw result.error
        console.log("add liq sendTransaction Result: ", result.value);
        update();
    }

    // *********** Remove liq. ***********
    document.getElementById('remove').onclick = async function () {
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

        // Send manifest to extension for signing
        const result = await rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
        if (result.isErr()) throw result.error
        console.log("remove liq sendTransaction Result: ", result.value);
        update();
    }
}

if (window.location.pathname === '/update.html') {
    // *********** update ***********
    document.getElementById('update').onclick = async function () {
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
        const result = await rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
        if (result.isErr()) throw result.error
        console.log("Update sendTransaction Result: ", result.value)
    }

    // *********** mark ***********
    document.getElementById('mark').onclick = async function () {
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
        const result = await rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
        if (result.isErr()) throw result.error
        console.log("mark sendTransaction Result: ", result.value)
        update();
    }

    // *********** LiquidateWithMarker ***********
    document.getElementById('liqwithmark').onclick = async function () {
        let markerId = document.getElementById("marker-select").value;
        let stabAmount = walletStab;
        let manifest = `
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
      Decimal("${stabAmount}");
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

        // Send manifest to extension for signing
        const result = await rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
        if (result.isErr()) throw result.error
        console.log("liq /w mark sendTransaction Result: ", result.value)
    }

    // *********** LiquidateWithoutMarker next***********
    document.getElementById('liqnext').onclick = async function () {
        let skipAmount = 1;
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
        console.log('liq w/o mark manifest: ', manifest)

        // Send manifest to extension for signing
        const result = await rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
        if (result.isErr()) throw result.error
        console.log("liq w/o mark sendTransaction Result: ", result.value)
    }

    // *********** LiquidateWithoutMarker next***********
    document.getElementById('liqnextskip').onclick = async function () {
        let skipAmount = document.getElementById("amount-to-skip").value + 1;
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
        const result = await rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
        if (result.isErr()) throw result.error
        console.log("liquidate sendTransaction Result: ", result.value)
    }
}

if (window.location.pathname === '/dashboard.html') {
    async function update_id() {
        let request = {
            "resource_address": stabIdAddress,
            "non_fungible_ids": [document.getElementById("id-select").value],
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
                cdpAmountId = data.non_fungible_ids[0].data.programmatic_json.fields[0].value;
                cdpIds = data.non_fungible_ids[0].data.programmatic_json.fields[1].elements;
                cdpWaitingAmount = data.non_fungible_ids[0].data.programmatic_json.fields[2].value;
                cdpWaitingIds = data.non_fungible_ids[0].data.programmatic_json.fields[3].elements;
                lpAmountId = data.non_fungible_ids[0].data.programmatic_json.fields[4].value;
                lpWaitingAmount = data.non_fungible_ids[0].data.programmatic_json.fields[5].value;
                nextClaim = data.non_fungible_ids[0].data.programmatic_json.fields[6].value;
                ilisAmountId = data.non_fungible_ids[0].data.programmatic_json.fields[7].value;
                ilisWaitingAmount = data.non_fungible_ids[0].data.programmatic_json.fields[8].value;
            })
            .catch(error => console.error('Error:', error));

        document.getElementById('cdpAmountId').textContent = (1 * cdpAmountId).toFixed(2) + ` (${(1 * cdpWaitingAmount).toFixed(2)})`;
        let cdpWaitingIdsValues = cdpWaitingIds.map(obj => obj.value).join(', ');
        let cdpIdsValues = cdpIds.map(obj => obj.value).join(', ');
        if (cdpIdsValues === "") {
            cdpIdsValues = "none";
        }
        if (cdpWaitingIdsValues === "") {
            cdpWaitingIdsValues = "none";
        }
        document.getElementById('cdpIds').textContent = cdpIdsValues + ` (${cdpWaitingIdsValues})`;
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

    document.getElementById('id-select').onchange = async function () {
        update_id();
    }

    // *********** Create ID ***********
    document.getElementById('new-id').onclick = async function () {
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
        const result = await rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
        if (result.isErr()) throw result.error
        console.log("create id sendTransaction Result: ", result.value)
        update();
        update_id();
    }

    // *********** Claim ***********
    document.getElementById('claim-button').onclick = async function () {
        let stabId = document.getElementById('id-select').value;
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
        const result = await rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
        if (result.isErr()) throw result.error
        console.log("claim sendTransaction Result: ", result.value)
        update_id();
    }

    // *********** Claim with restake ***********
    document.getElementById('claim-button-restake').onclick = async function () {
        let stabId = document.getElementById('id-select').value;
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
        const result = await rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
        if (result.isErr()) throw result.error
        console.log("claim sendTransaction Result: ", result.value)
        update_id();
    }

    // *********** Stake ***********
    document.getElementById('stake-button').onclick = async function () {
        let stabId = document.getElementById('id-select').value;
        let lpAmount = document.getElementById('stake-lp-field').value;
        let ilisAmount = document.getElementById('stake-ilis-field').value;
        let manifest;

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
              "stake_lp"
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
          "stake_lp"
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
              "stake_ilis"
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
              "stake_ilis"
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
        const result = await rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
        if (result.isErr()) throw result.error
        console.log("stake sendTransaction Result: ", result.value)
        update_id();
    }

    // *********** Unstake ***********
    document.getElementById('unstake-button').onclick = async function () {
        let stabId = document.getElementById('id-select').value;
        let lpAmount = document.getElementById('unstake-lp-field').value;
        let ilisAmount = document.getElementById('unstake-ilis-field').value;
        let manifest;

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
                  "unstake_lp"
                  Proof("id_proof")
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
              "unstake_lp"
              Proof("id_proof")
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
                  "unstake_ilis"
                  Proof("id_proof_2")
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
                  "unstake_ilis"
                  Proof("id_proof")
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
        const result = await rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
        if (result.isErr()) throw result.error
        console.log("unstake sendTransaction Result: ", result.value)
        update_id();
    }

    /* *********** Stake CDP ***********
    document.getElementById('cdp-stake-button').onclick = async function () {
        if (stakedTo !== "#0#") {
            let cdpId = document.getElementById('cdp-select').value;
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
      "unstake_cdp"
      Proof("cdp_proof");
      `
            console.log('stake manifest: ', manifest)

            // Send manifest to extension for signing
            const result = await rdt.walletApi
                .sendTransaction({
                    transactionManifest: manifest,
                    version: 1,
                })
            if (result.isErr()) throw result.error
            console.log("stake sendTransaction Result: ", result.value)
            update_cdp();
            update_id();
        } else {
            let cdpId = document.getElementById('cdp-select').value;
            let stabId = document.getElementById('id-stake-select').value;
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
      "stake_cdp"
      Proof("id_proof")
      Proof("cdp_proof");
      `
            console.log('stake manifest: ', manifest)

            // Send manifest to extension for signing
            const result = await rdt.walletApi
                .sendTransaction({
                    transactionManifest: manifest,
                    version: 1,
                })
            if (result.isErr()) throw result.error
            console.log("stake sendTransaction Result: ", result.value)
            update_cdp();
            update_id();
        }
    }*/
}

if (window.location.pathname === '/manage-cdps.html') {
    let status;
    let resourceAddress;
    let debtAmount;
    let parentAddress;
    let collateralAmount;
    let stakedTo;
    let cr;

    async function update_cdp() {
        let request = {
            "resource_address": cdpAddress,
            "non_fungible_ids": [document.getElementById("cdp-select").value],
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
                parentAddress = data.non_fungible_ids[0].data.programmatic_json.fields[1].value;
                collateralAmount = data.non_fungible_ids[0].data.programmatic_json.fields[3].value;
                debtAmount = data.non_fungible_ids[0].data.programmatic_json.fields[4].value;
                stakedTo = data.non_fungible_ids[0].data.programmatic_json.fields[8].value;
                cr = data.non_fungible_ids[0].data.programmatic_json.fields[5].value;
                status = data.non_fungible_ids[0].data.programmatic_json.fields[6].variant_name;
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
        if (stakedTo !== "#0#") {
            document.getElementById('stakedTo').textContent = stakedTo;
        }
        else {
            document.getElementById('stakedTo').textContent = 'none';
        }
        if (status == "Liquidated") {
            document.getElementById('close-entire-button').value = "Recover col.";
            document.getElementById('close-entire-button').style.backgroundColor = 'black';
            document.getElementById('close-entire-button').style.color = 'white';
            document.getElementById('status').style.color = 'red';
            document.getElementById('debtAmount').textContent = "-";
            document.getElementById('cr').textContent = "-";
        } else if (status == "Marked") {
            document.getElementById('close-entire-button').value = "Close fully";
            document.getElementById('status').style.color = '#ef7200';
        }
        else if (status == "Closed" || status == "Healthy") {
            document.getElementById('close-entire-button').value = "Close fully";
            document.getElementById('status').style.color = 'black';
        }

        if (status !== "Liquidated") {
            document.getElementById('close-entire-button').style.backgroundColor = '#999999';
            document.getElementById('close-entire-button').style.color = 'black';
        }
    }

    document.getElementById('cdp-select').onchange = async function () {
        update_cdp();
    }

    // *********** Top up CDP ***********
    document.getElementById('add-col-button').onclick = async function () {
        let cdpId = document.getElementById('cdp-select').value;
        let collateralAmount = document.getElementById('amount-to-remove').value;
        let collateralAddress = resourceAddress;
        let manifest;
        if (status == "Healthy") {
            manifest = `
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
        }
        else {
            manifest = `
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
            "save_cdp"
            Proof("cdp_proof")
            Bucket("xrd_bucket");
            `
        }

        console.log('top up manifest: ', manifest)

        // Send manifest to extension for signing
        const result = await rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
        if (result.isErr()) throw result.error
        console.log("top up sendTransaction Result: ", result.value)
        update_cdp();
    }

    // *********** Remove collateral CDP ***********
    document.getElementById('remove-col-button').onclick = async function () {
        let cdpId = document.getElementById('cdp-select').value;
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
        const result = await rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
        if (result.isErr()) throw result.error
        console.log("remove col. Result: ", result.value)
        update_cdp();
    }

    // *********** Close CDP ***********
    document.getElementById('close-entire-button').onclick = async function () {
        if (warned == true || stakedTo == "#0#") {
            console.log("hello");
            let cdpId = document.getElementById('cdp-select').value;

            if (status == "Liquidated") {
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
                const result = await rdt.walletApi
                    .sendTransaction({
                        transactionManifest: manifest,
                        version: 1,
                    })
                if (result.isErr()) throw result.error
                console.log("retrieve col. sendTransaction Result: ", result.value)

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
                const result = await rdt.walletApi
                    .sendTransaction({
                        transactionManifest: manifest,
                        version: 1,
                    })
                if (result.isErr()) throw result.error
                console.log("Close cdp Result: ", result.value)
            }
            document.getElementById('close-fully-warning').style.display = 'none';
            update_cdp();
        } else {
            document.getElementById('close-fully-warning').style.display = '';
            warned = true;
        }

    }
}
if (window.location.pathname === '/open-cdp.html') {
    var slider = document.getElementById('slider-single');
    var plus = document.getElementById('plus-button');
    var minus = document.getElementById('minus-button');
    var h2 = document.getElementById('colRatioStab');
    let colToUse = document.getElementById("colToUse");
    // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
        h2.textContent = slider.value;
        if (colToUse.value !== "") {
            ((1 / stabXrdRatio) / 2.5).toFixed(4)
            let result = ((1 / (stabXrdRatio * validatorMultiplier)) / (this.value / 100)) * colToUse.value;
            collateralAmount = colToUse.value;
            document.getElementById("outputStab").innerHTML = customRound(result, 4);
        } else {
            let result = (1 / (stabXrdRatio * validatorMultiplier)) / (this.value / 100);
            collateralAmount = 0;
            document.getElementById("outputStab").innerHTML = customRound(result, 4);
        }
    }

    plus.onclick = function () {
        slider.value = parseInt(slider.value) + 1;
        h2.textContent = slider.value;
        if (colToUse.value !== "") {
            let result = ((1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100)) * colToUse.value;
            collateralAmount = this.value;
            document.getElementById("outputStab").innerHTML = customRound(result, 4);
        } else {
            let result = (1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100) * 1;
            collateralAmount = 0;
            document.getElementById("outputStab").innerHTML = customRound(result, 4);
        }
    }

    minus.onclick = function () {
        slider.value = parseInt(slider.value) - 1;
        h2.textContent = slider.value;
        if (colToUse.value !== "") {
            let result = ((1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100)) * colToUse.value;
            collateralAmount = this.value;
            document.getElementById("outputStab").innerHTML = customRound(result, 4);
        } else {
            let result = (1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100) * 1;
            collateralAmount = 0;
            document.getElementById("outputStab").innerHTML = customRound(result, 4);
        }
    }

    document.getElementById('id-select').onchange = async function () {
        if (this.value !== "link1") {
            document.getElementById('warning-no-id').style.display = 'none';
            idSupplied = true;
        } else {
            document.getElementById('warning-no-id').style.display = '';
            idSupplied = false;
        }
    }


    document.getElementById("colToUse").oninput = function () {
        h2.textContent = slider.value;
        let selectElement = document.getElementById("collateral-select");
        selectedText = selectElement.options[selectElement.selectedIndex].text;

        if (this.value !== "") {
            let result = ((1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100)) * this.value;
            collateralAmount = this.value;
            document.getElementById("outputStab").innerHTML = customRound(result, 4);
        } else {
            let result = (1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100) * 1;
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

    document.getElementById("collateral-select").onchange = async function () {
        let url = "https://stokenet.radixdlt.com/state/entity/details";
        let resourceAddress = this.value;
        validatorMultiplier = 1;

        let validatorAddress = getValidatorAddress(resourceAddress);

        if (resourceAddress !== "link1") {
            let data = {
                "addresses": [resourceAddress],
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

            let balance;
            let totalSupply;

            await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => response.json())
                .then(data => {
                    totalSupply = data.items[0].details.total_supply;
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
                        if (validators[i].address === validatorAddress) {
                            balance = validators[i].stake_vault.balance;
                            break;
                        }
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            validatorMultiplier = totalSupply / balance;
        }

        if (colToUse.value !== "") {
            let result = ((1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100)) * colToUse.value;
            collateralAmount = colToUse.value;
            document.getElementById("outputStab").innerHTML = customRound(result, 4);
        } else {
            let result = (1 / (stabXrdRatio * validatorMultiplier)) / (slider.value / 100);
            collateralAmount = 0;
            document.getElementById("outputStab").innerHTML = customRound(result, 4);
        }

        let selectElement = document.getElementById("collateral-select");
        selectedText = selectElement.options[selectElement.selectedIndex].getAttribute('identifier');

        if (colToUse.value !== "") {
            document.getElementById("ratio-suffix").innerHTML = "STAB";
        }
        else {
            document.getElementById("ratio-suffix").innerHTML = "STAB/" + selectedText;
        }
    }

    // *********** Mint safe ***********
    document.getElementById('mint-button').onclick = async function () {
        let mintAmount = 1;
        mintAmount = document.getElementById("colToUse").value;
        let poolUnit = document.getElementById("collateral-select").value;
        let stabId = document.getElementById('id-select').value;
        if (poolUnit === "link1") {
            poolUnit = xrdAddress;
        }
        let manifest;
        console.log(idSupplied);
        if (idSupplied == true) {
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
    Address("${accountAddress}")
    "withdraw"    
    Address("${poolUnit}")
    Decimal("${collateralAmount}");

    TAKE_ALL_FROM_WORKTOP
    Address("${poolUnit}")
    Bucket("collateral");
    CALL_METHOD
    Address("${componentAddress}")
    "open_cdp"
    Bucket("collateral")
    Decimal("${mintAmount}")
    true
    Some(Proof("id_proof"));

    CALL_METHOD
    Address("${accountAddress}")
    "deposit_batch"
    Expression("ENTIRE_WORKTOP");
    `
        } else {
            manifest = `
    CALL_METHOD
    Address("${accountAddress}")
    "withdraw"    
    Address("${poolUnit}")
    Decimal("${collateralAmount}");
    TAKE_ALL_FROM_WORKTOP
    Address("${poolUnit}")
    Bucket("collateral");
    CALL_METHOD
    Address("${componentAddress}")
    "open_cdp"
    Bucket("collateral")
    Decimal("${mintAmount}")
    true
    None;
    CALL_METHOD
    Address("${accountAddress}")
    "deposit_batch"
    Expression("ENTIRE_WORKTOP");
    `
        }
        console.log('Mint manifest: ', manifest)

        // Send manifest to extension for signing
        const result = await rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
        if (result.isErr()) throw result.error
        console.log("Mint Result: ", result.value)
        update();
    }

    // *********** Mint unsafe *********** //
    document.getElementById('unsafe-mint-button').onclick = async function () {
        let mintAmount = 1;
        mintAmount = document.getElementById("colToUse").value;
        let poolUnit = document.getElementById("collateral-select").value;
        if (poolUnit === "link1") {
            poolUnit = xrdAddress;
        }
        let manifest;
        if (idSupplied == true) {
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
    Address("${accountAddress}")
    "withdraw"    
    Address("${poolUnit}")
    Decimal("${collateralAmount}");
    TAKE_ALL_FROM_WORKTOP
    Address("${poolUnit}")
    Bucket("collateral");
    CALL_METHOD
    Address("${componentAddress}")
    "open_cdp"
    Bucket("collateral")
    Decimal("${mintAmount}")
    false
    Some(id_proof);
    CALL_METHOD
    Address("${accountAddress}")
    "deposit_batch"
    Expression("ENTIRE_WORKTOP");
    `
        } else {
            manifest = `
    CALL_METHOD
    Address("${accountAddress}")
    "withdraw"    
    Address("${poolUnit}")
    Decimal("${collateralAmount}");
    TAKE_ALL_FROM_WORKTOP
    Address("${poolUnit}")
    Bucket("collateral");
    CALL_METHOD
    Address("${componentAddress}")
    "open_cdp"
    Bucket("collateral")
    Decimal("${mintAmount}")
    false
    None;
    CALL_METHOD
    Address("${accountAddress}")
    "deposit_batch"
    Expression("ENTIRE_WORKTOP");
    `
        }
        console.log('Unsafe mint manifest: ', manifest)

        // Send manifest to extension for signing
        const result = await rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
        if (result.isErr()) throw result.error
        console.log("Unsafe mint Result: ", result.value)
        update();
    }
}
