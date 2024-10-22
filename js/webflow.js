import { RadixDappToolkit, Logger, DataRequestBuilder, RadixNetwork } from '@radixdlt/radix-dapp-toolkit'
import * as d3 from 'd3';
import { Chart, registerables } from 'chart.js';
import { BehaviorSubject, firstValueFrom, timeout, catchError, of } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
Chart.register(...registerables);


// You can create a dApp definition in the dev console at https://mainnet-console.radixdlt.com/dapp-metadata 
// then use that account for your dAppId

const DEFAULT_ADDRESS = "account_rdx12x96pjxqazraqf2f9pdqxsl0a2mpzgep6dfny039dhv8ksd33gc52m";
let accountAddress = "account_rdx12x96pjxqazraqf2f9pdqxsl0a2mpzgep6dfny039dhv8ksd33gc52m";

let accountAddressForDeployment = "account_rdx12xl2meqtelz47mwp3nzd72jkwyallg5yxr9hkc75ac4qztsxulfpew"

let hashToStore = "5a1e6657d375ba5c02e652df11fe4daae3b55e25c5ca17ba85954744247952ff"
let hashToStore2 = "ea69ff86fa091c785b2e0ba3741aa7163ed101dad17696c332d89074c8fac221"
let storageKvs = "internal_keyvaluestore_rdx1krupls6a9x689fnkcpr7nt7n5xl8zmk7gvm2d6rmavxjs6z92dllhg"
let storageComponent = "component_rdx1crlx9t5hdz2yx494zhcqyquyhdmwvnuryqt4lty2d6tcng3elxtuee"
let xrdAddress = "resource_rdx1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxradxrd"
let ilisAddress = "resource_rdx1t4r86qqjtzl8620ahvsxuxaf366s6rf6cpy24psdkmrlkdqvzn47c2"
let ilisCtrlBadgeAddress = "resource_rdx1tkay6uzp3ere9q6ccw346rs39w4mwdu6k6vxz43y4zkj9yy3zu4gx2"
let ociDappDef = "account_rdx12x2ecj3kp4mhq9u34xrdh7njzyz0ewcz4szv0jw5jksxxssnjh7z6z"
let morpherComponentAddress = "component_rdx1cp07hrz378zfugcf6h8f9usct4zqx7rdgjhxjwphkzxyv9h7l2q04s"
let incentiveInterval = 7
let bootstrapLength = 7

let daoPackageAddress = "package_rdx1phynepmcrquypznw89ugjvv0mrarnc85mh3my2lmyh7rls3n6tz08t"

let daoAddress = "component_rdx1cpj9kwxx4dqxu797dhkvtskhlxvxajl6ztkktxl9atqdtcqefk9dnh"
let dAppIdDao = "account_rdx1c9ucwvhtwvhnvpf48z64ypmh58wx6mf2xjpp5eptp4n9mrkfgkkv22"
let accountLocker = "locker_rdx1dq9efjs7h2cwgdfnjs0ryezdp7rxcl7w2h5swe28h3q90jeel0sqr7"
let lbpComponentAddress = "component_rdx1czeaegqtsr6qw6pvrmfe9g2jcyflz5yx7fx0y2vwkgsyu7cuql2lrp"
let lbpPoolAddress = "pool_rdx1ckq85p6azutzhjd2w075cpwd0t8fj6p4ks9r2ua838e9htyp5vs5v2"
let stakingAddress = "component_rdx1czgeduf7xkzgrh8t5qrju6zejdcvfdu0wqqq6azgcs682afuxtjdv9"
let ilisPool = "pool_rdx1cs9crdyffyfn48vcctfgkjtkau8mfdt2js07vw5fh79fk6aswzhtn3"
let incentiveAddress = "component_rdx1cr6nsvdf5vuq97f3nqzjdqhh52439e0w6wm5nf2vc8ype6uz6843f9"
let governanceAddress = "component_rdx1czh6hmmgzxqdv4dza3mnvhja4c6m3y9h5k4063x4vqn4h40lq04j2n"
let reentracyProxy = "component_rdx1cqaqlhk288edgt0warjynh68900srmfel2emq4fy040fz8dqdzk0rj"
let bootBadge = "resource_rdx1t5lh4sfru05ahcttnhterfhsjqaecd8qkwkr2fsvv0pqzaev8fgjl7"
let lbpPoolUnit = "resource_rdx1tk8lhxv0m0npvzxmexk375dv9r8t0s6wq26yf3p7ktkleq7qzglhzl"
let poolIlisAddress = "resource_rdx1t4xn9vp6sa953tv3gqlf7p7hek4anhz5wkxrffmwcr5wfw9ffvgyf6"
let membershipIdAddress = "resource_rdx1ntsrpxwdvrnzt3kmkx7nlhvy8t5t2ckxqmp9ydpwf92ltjfwn07pkx"
let membershipTransferAddress = "resource_rdx1ng2up00nfkdtf87ytrqvs6zvu6rgfwgwrw6ksyl6gnz4mpqaj4hhda"
let membershipUnstakeAddress = "resource_rdx1nfxms582l535nd6ual0h0yk5tpegu9967rzkvwn7h4ym9numqfdwpy"
let incentiveIdAddress = "resource_rdx1ng2nu559nw2lutyl48hafycj42km8qg7v0t4nnqkuwy74c56l3xruu"
let incentiveTransferAddress = "resource_rdx1ntxajna45s0mqyspfd6hsq5jmxw673skpdr45xphmv8ew4k72j2sdg"
let incentiveUnstakeAddress = "resource_rdx1n25n0u6v9js835tjdzqgfarvzygjntq5d4s74e4nfzjj4nf29tf2dp"
let proposalReceiptAddress = "resource_rdx1ngwhlept050nw3evc6fk8stms9n44krh5f9efvl3clusuhlgsy5f8a"

let stabPackageAddress = "package_rdx1pkgatd06tuuucchya5ctwfcvd0rgw3yvm5pp800942hd0u3w56n626"

let stabComponentAddress = "component_rdx1cq70cjajtvllgk9z9wm9l8v6w8hsgtlw530cdgpraxprn4yevg89kf"
let ctrlBadgeAddress = "resource_rdx1thsc69k2lm99jduyyfct0yl0fsqud4h25wvavwp7p5zw65r5h65tx5"
let stabAddress = "resource_rdx1t40lchq8k38eu4ztgve5svdpt0uxqmkvpy4a2ghnjcxjtdxttj9uam"
let cdpAddress = "resource_rdx1ng373z7kqwvseu4d9rjdq3wux34zu7mtvg9255sl0j7dauuj67dfxz"
let markerAddress = "resource_rdx1nggz77xqf9f5gnklq8vdc204neulhm88eu9z66l2d9meueqn34qtuq"
let liqAddress = "resource_rdx1nfwchpaj9fq5uhg96c873xlw08e5hcvqacsn6gk5g8tv4w5tk44fl6"

let proxyComponentAddress = "component_rdx1cqecl844an5n8w7dpelwr6mxrgad2kzj57nl5064q64wxwyxaxxpuk"
let dAppIdStab = "account_rdx1cydlgtkk5yp3jym4t89k8ffrg2ytnge83q3m6z4fuzg5geseawdv94"
let poolComponentAddress = "component_rdx1cz9nke03hd9wgvkck0dw2tdcu4ex588e0c283lmu5f2are8e6h9rk2"
let poolAddress = "pool_rdx1c4jj8lklg7edacflhk0tl202dzgawkujly4kqf0jfehyqd8watxw0r"
let oracleComponent = "component_rdx1czc98y36sjzn3rzf60rjdc2ks33zlpn8lkv5nc7z30amhxzslccyvs"
let flashLoansComponent = 'component_rdx1cpkz36wvyzce5vddewsu3g3nhgghr9d0ggkkvek3ly8rxrkckzsq7c'
let lpAddress = "resource_rdx1t59m2c48gtrflsxms35d7alkggyed383fw0mfe98c3v3z6xcqds28h"
let flashLoanReceipt = "resource_rdx1ngqggm445297u03dka8r86acvvf2vv5a74y0t0xjdpx5d7thactfa0"
let lpAddressForIncentives = lpAddress
let selectedResource = lpAddressForIncentives

let lbpKvsHexes = ["5c0a0000000000000000", "5c0a0100000000000000", "5c0a0200000000000000"]
let xrdKeyHex = "5c805da66318c6318c61f5a61b4c6318c6318cf794aa8d295f14e6318c6318c6"
const earliestTimestamp = new Date("2024-10-18T06:15:59.04Z");

let ilisUnlockMultiplier = 2;
let lbpUnlockMultiplier = 5;
let lbpLockPayment = 1.001;
let ilisLockPayment = 1.001;
let feeLbp = 0.002;
let initialIlisWeight = 0.99;
let initialXrdWeight = 0.01;

const acceptedResources = [["XRD", xrdAddress, "", "images/radix-logo.svg", 1, 'XRD', 0]]
const incentive_resources = [["LPSTAB", "images/lplogo.png", lpAddressForIncentives]]

const addressSubject = new BehaviorSubject(DEFAULT_ADDRESS);
let latestUpdateId = 0;
const baseLink = "https://radix-files-mainnet.vercel.app/";
let network = RadixNetwork.Mainnet;

let dAppId = "account_rdx1c9ucwvhtwvhnvpf48z64ypmh58wx6mf2xjpp5eptp4n9mrkfgkkv22";
let dAppName = 'ILIS DAO'
if (window.location.pathname === "/borrow" || window.location.pathname === "/swap" || window.location.pathname === "/manage-loans" || window.location.pathname === "/liquidations") {
    dAppId = dAppIdStab;
    dAppName = 'STAB Protocol'
}

if (window.location.pathname == "/deployment") {
    dAppId = "account_tdx_2_12yjctk8r4csusav9c7z9a7j9vahmnnhnht5ym2ffngh9rqyajsgsdd"
    document.getElementById('instantiate-dao').onclick = async function () {
        let manifest;
        manifest = `
            CALL_METHOD
            Address("${accountAddressForDeployment}")
            "withdraw"
            Address("${ilisAddress}")
            Decimal("100000000")
            ;

            TAKE_ALL_FROM_WORKTOP
            Address("${ilisAddress}")
            Bucket("ilis")
            ;

            CALL_METHOD
            Address("${accountAddressForDeployment}")
            "withdraw"
            Address("${ilisCtrlBadgeAddress}")
            Decimal("9")
            ;

            TAKE_ALL_FROM_WORKTOP
            Address("${ilisCtrlBadgeAddress}")
            Bucket("admin_badge")
            ;

            CALL_METHOD
            Address("${accountAddressForDeployment}")
            "withdraw"
            Address("${xrdAddress}")
            Decimal("50000")
            ;

            TAKE_ALL_FROM_WORKTOP
            Address("${xrdAddress}")
            Bucket("bootstrap_xrd")
            ;

            CALL_FUNCTION
            Address("${daoPackageAddress}")
            "Dao"
            "instantiate_dao"
            Bucket("ilis")
            Decimal("0.18")
            Decimal("0.08")
            Decimal("0.1")
            Decimal("0.1")
            Bucket("admin_badge")
            "ILIS DAO"
            "ILIS"
            Bucket("bootstrap_xrd")
            Address("${ociDappDef}")
            true
            ${bootstrapLength}i64
            Decimal("1000")
            ${incentiveInterval}i64
            "https://ilikeitstable.com"
            "https://ilikeitstable.com/images/proposal.png"
            "https://ilikeitstable.com/images/staking-id.png"
            "https://ilikeitstable.com/images/transfer.png"
            "https://ilikeitstable.com/images/unstake.png"
            "https://ilikeitstable.com/images/ilislogo.png"
            ;

            CALL_METHOD
            Address("${accountAddressForDeployment}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
;
        `
        console.log('manifest: ', manifest)

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
            })
            .catch(error => {       
            });
    }

    document.getElementById('change-ilis-metadata').onclick = async function () {
        let manifest;
        manifest = `
            CALL_METHOD
            Address("${accountAddressForDeployment}")
            "create_proof_of_amount"
            Address("${ilisCtrlBadgeAddress}")
            Decimal("1")
            ;

            SET_METADATA
            Address("${ilisAddress}")
            "stake_component"
            Enum<8u8>(
                Address("${stakingAddress}")
            )
            ;
        `
        console.log('manifest: ', manifest)

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
            })
            .catch(error => {       
            });
    }

    document.getElementById('deposit-admin-badges-into-governance').onclick = async function () {
        let manifest;
        manifest = `
            CALL_METHOD
            Address("${accountAddressForDeployment}")
            "withdraw"
            Address("${ilisCtrlBadgeAddress}")
            Decimal("1")
            ;

            TAKE_ALL_FROM_WORKTOP
            Address("${ilisCtrlBadgeAddress}")
            Bucket("admin_badge")
            ;

            CALL_METHOD
            Address("${governanceAddress}")
            "put_tokens"
            Bucket("admin_badge")
;
        `
        console.log('manifest: ', manifest)

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
            })
            .catch(error => {       
            });
    }

    document.getElementById('instantiate-stab-protocol').onclick = async function () {
        let manifest;
        manifest = `
            CALL_FUNCTION
            Address("${stabPackageAddress}")
            "Stabilis"
            "instantiate"
            ;

            CALL_METHOD
            Address("${accountAddressForDeployment}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
            ;
        `
        console.log('manifest: ', manifest)

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
            })
            .catch(error => {       
            });
    }

    document.getElementById('instantiate-stab-protocol-after').onclick = async function () {
        let manifest;
        manifest = `
            CALL_METHOD
            Address("${accountAddressForDeployment}")
            "create_proof_of_amount"
            Address("${ctrlBadgeAddress}")
            Decimal("0.75")
            ;

            CALL_METHOD
            Address("${stabComponentAddress}")
            "add_collateral"
            Address("${xrdAddress}")
            Decimal("1.5")
            Decimal("0.15")
            ;

            CALL_METHOD
            Address("${accountAddressForDeployment}")
            "withdraw"
            Address("${xrdAddress}")
            Decimal("1000")
            ;

            TAKE_ALL_FROM_WORKTOP
            Address("${xrdAddress}")
            Bucket("xrd_bucket")
            ;

            CALL_METHOD
            Address("${stabComponentAddress}")
            "open_cdp"
            Bucket("xrd_bucket")
            Decimal("1")
            ;

            CALL_METHOD
            Address("${accountAddressForDeployment}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
            ;
        `
        console.log('manifest: ', manifest)

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
            })
            .catch(error => {       
            });
    }

    document.getElementById('instantiate-proxy').onclick = async function () {
        let manifest;
        manifest = `
            CALL_METHOD
            Address("${accountAddressForDeployment}")
            "withdraw"
            Address("${xrdAddress}")
            Decimal("75")
            ;

            TAKE_ALL_FROM_WORKTOP
            Address("${xrdAddress}")
            Bucket("xrd")
            ;

            CALL_METHOD
            Address("${accountAddressForDeployment}")
            "withdraw"
            Address("${stabAddress}")
            Decimal("1")
            ;

            TAKE_ALL_FROM_WORKTOP
            Address("${stabAddress}")
            Bucket("stab")
            ;

            CALL_METHOD
            Address("${accountAddressForDeployment}")
            "withdraw"
            Address("${ctrlBadgeAddress}")
            Decimal("9")
            ;

            TAKE_ALL_FROM_WORKTOP
            Address("${ctrlBadgeAddress}")
            Bucket("admin_badge")
            ;

            CALL_FUNCTION
            Address("${stabPackageAddress}")
            "Proxy"
            "new"
            Bucket("xrd")
            Bucket("stab")
            Bucket("admin_badge")
            Enum<1u8>(
                Enum<2u8>(
                Enum<0u8>(
                    Enum<0u8>(
                    Enum<1u8>(
                        Address("${ilisCtrlBadgeAddress}")
                    )
                    )
                )
                )
            )
            Address("${morpherComponentAddress}")
            Address("${cdpAddress}")
            Address("${markerAddress}")
            Address("${stabComponentAddress}")
            Address("${ilisAddress}")
            ;

            CALL_METHOD
            Address("${accountAddressForDeployment}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
            ;
        `
        console.log('manifest: ', manifest)

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
            })
            .catch(error => {       
            });
    }

    document.getElementById('after-proxy-instantiation').onclick = async function () {
        let manifest;
        manifest = `
           CALL_METHOD
            Address("${accountAddressForDeployment}")
            "create_proof_of_amount"
            Address("${ctrlBadgeAddress}")
            Decimal("0.75")
            ;

            CALL_METHOD
            Address("${stabComponentAddress}")
            "set_stops"
            false
            true
            false
            false
            false
            ;

            SET_METADATA
            Address("${lpAddress}")
            "icon_url"
            Enum<13u8>(
                "https://ilikeitstable.com/images/lplogo.png"
            )
            ;

            SET_METADATA
            Address("${lpAddress}")
            "stake_component"
            Enum<8u8>(
                Address("${incentiveAddress}")
            )
            ;

            SET_METADATA
            Address("${stabComponentAddress}")
            "dapp_definition"
            Enum<8u8>(
                Address("${dAppIdStab}")
            )
            ;
        `
        console.log('manifest: ', manifest)

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
            })
            .catch(error => {       
            });
    }

    document.getElementById('add-proposal-and-vote').onclick = async function () {
        let manifest;
        manifest = `
           CALL_METHOD
            Address("${accountAddressForDeployment}")
            "withdraw"
            Address("${ilisAddress}")
            Decimal("10000")
            ;

            TAKE_ALL_FROM_WORKTOP
            Address("${ilisAddress}")
            Bucket("payment_for_proposal")
            ;

            CALL_METHOD
            Address("${governanceAddress}")
            "create_proposal"
            "Accepting Operating Agreement and Establishing STAB Protocol Governance"
            "This proposal aims to accept the newly updated Operational Agreement of the ILIS DAO, establish the DAO's governance over the STAB Protocol, implement incentives for using the protocol, allocate rewards for collateral price updaters, and adjust the DAO's voting parameters. It is the same as Proposal #1, but with correct on-chain execution."
            Enum<1u8>(
                Array<Tuple>(
                    Tuple(
                        "${storageKvs}",
                        Address("${storageComponent}"),
                        "${hashToStore}"
                    ),
                    Tuple(
                        "${storageKvs}",
                        Address("${storageComponent}"),
                        "${hashToStore2}"
                    )
                )
            )
            Address("${incentiveAddress}")
            Address("${ilisCtrlBadgeAddress}")
            "add_stakable"
            Tuple(
                Address("${lpAddress}"),
                Decimal("200000"),
                Decimal("1.001"),
                365i64,
                Decimal("1.005"),
                Decimal("1")
            )
            false
            false
            Bucket("payment_for_proposal")
            ;

            TAKE_ALL_FROM_WORKTOP
            Address("${proposalReceiptAddress}")
            Bucket("proposal_receipt")
            ;

            CREATE_PROOF_FROM_BUCKET_OF_ALL
            Bucket("proposal_receipt")
            Proof("proposal_proof")
            ;

            CALL_METHOD
            Address("${governanceAddress}")
            "add_proposal_step"
            Proof("proposal_proof")
            Address("${daoAddress}")
            Address("${ilisCtrlBadgeAddress}")
            "send_tokens"
            Tuple(
                Address("${ilisAddress}"),
                Enum<0u8>(
                Decimal("100000")
                ),
                Address("${proxyComponentAddress}"),
                "put_reward_in_vault"
            )
            false
            false
            ;

            CREATE_PROOF_FROM_BUCKET_OF_ALL
            Bucket("proposal_receipt")
            Proof("proposal_proof_2")
            ;

            CALL_METHOD
            Address("${governanceAddress}")
            "add_proposal_step"
            Proof("proposal_proof_2")
            Address("${governanceAddress}")
            Address("${ilisCtrlBadgeAddress}")
            "set_parameters"
            Tuple(
                Decimal("10000"),
                7i64,
                Decimal("10000"),
                Decimal("0.5"),
                7i64
            )
            false
            true
            ;

            CREATE_PROOF_FROM_BUCKET_OF_ALL
            Bucket("proposal_receipt")
            Proof("proposal_proof_3")
            ;

            CALL_METHOD
            Address("${governanceAddress}")
            "submit_proposal"
            Proof("proposal_proof_3")
            ;

            CALL_METHOD
            Address("${accountAddressForDeployment}")
            "deposit"
            Bucket("proposal_receipt")
            ;
        `
        console.log('manifest: ', manifest)

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
            })
            .catch(error => {       
            });
    }

    document.getElementById('start-bootstrap').onclick = async function () {
        let manifest;
        manifest = `
            CALL_METHOD
            Address("${lbpComponentAddress}")
            "start_bootstrap"
            ;
        `
        console.log('manifest: ', manifest)

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
            })
            .then(result => {
            })
            .catch(error => {       
            });
    }
}

let xrdLbpPrice;
let selectedText;
let xrdPrice;
let interestRate;
let stab_ids = [];
let cdp_ids = [];
let marker_ids = [];
let incentive_ids = [];
let incentive_unstake_receipts = [];
let membership_unstake_receipts = [];
let currentIncentivePeriod;
let stabXrdRatio;
let internalPrice;
let validatorMultiplier;
let walletIlis;
let walletResource;
let walletXrd;
let walletLp;
let walletStab;
let formattedWallet;
let xrdPoolAmount;
let stabPoolAmount;
let fee = 0.001;
let sell = true;
let stake = true;
let lock = true;
let lbpSell = true;
let idSupplied = false;
let status;
let resourceAddress;
let debtAmount;
let collateralAmount;
let cr;
let markedTime;
let markerUsed;
let markerDate;
let selectedCollateral;
let availableCollateral;
let selectedCdp;
let selectedId;
let selectedMarker;
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
let ilisLbpPoolAmount;
let xrdLbpPoolAmount;
let ilisWeight;
let xrdWeight;
let lbpProgress;
let nowLbpTime;
let lbpLength;
let lbpDuration;
let lbpStartTime;
let ledgerData;
let resourceAddresses = []
let validatorAddresses = []
let votingUntil;
let lockedUntil;
let ilisUndelegatingUntil;
let ilisDelegatingTo;
let amountStaked;
let poolIlisDelegatedToMe;
let poolMultiplier;
let totalInUnstaking = 0;
let totalReadyToUnstake = 0;
let idsReadyToUnstake = [];
let maxLockDaysFloor;
let maxUnlockDaysCeil;
let lockNow;
let currentRequiredPayment;
let claimablePeriods = 0;
let vote = true;
let maxProposals = 0;
let proposalsKvs;
let proposalToView = -1;
let quorum;
let parentAddress;
let stakingAmount;
let collateralsKvs;
let lbpEnded = false;
let realChart;
let currentLpReward;
let currentLpStaked;
let lpStabValue;
let currentIlisReward;
let currentIlisStaked;
let membershipApy;

function resizeChart() {
    const chartContainer = document.getElementById('chartContainer');
    chartContainer.style.height = '50vh';
    realChart.resize();
}

function generateKey(value) {
    // Ensure the value is treated as a BigInt
    const bigIntValue = BigInt(value);
    
    // Convert to hex, remove '0x' prefix, pad to 16 characters
    let hexValue = bigIntValue.toString(16).padStart(16, '0');
    
    // Reverse byte order (little-endian)
    let littleEndian = '';
    for (let i = 14; i >= 0; i -= 2) {
        littleEndian += hexValue.substr(i, 2);
    }
    
    // Prepend the prefix
    return `5c0a${littleEndian}`;
}

function generateDownloadLinks(files, baseLink) {
    return files.map(file => {
      const kvsAddress = file.fields.find(field => field.field_name === 'kvs_address').value;
      const fileHash = file.fields.find(field => field.field_name === 'file_hash').value;
      return `${baseLink}file/${kvsAddress}/${fileHash}`;
    });
  }
  
  function displayAttachmentLinks(links) {
    const attachmentsElement = document.getElementById('attachments');
    attachmentsElement.innerHTML = ''; // Clear any existing content
  
    const maxLinks = Math.min(links.length, 10); // Display max 10 links
  
    for (let i = 0; i < maxLinks; i++) {
      if (i > 0) {
        attachmentsElement.appendChild(document.createTextNode(', '));
      }
  
      const link = document.createElement('a');
      link.href = links[i];
      link.textContent = `[${i + 1}]`;
      link.style.color = '#00a3cc'; // Style to match your existing links
      link.style.textDecoration = 'none';
      link.target = '_blank'; // Open in new tab
  
      attachmentsElement.appendChild(link);
    }
  
    if (links.length > 10) {
      attachmentsElement.appendChild(document.createTextNode(', ...'));
    }
  }

function createStyledDownloadLink(data, filename) {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'data.json';
    link.textContent = 'download .json';
    link.target = '_blank';
    link.style.color = '#00a3cc';
    link.style.textDecoration = 'none'; // Add this if you want to remove the underline
    
    link.addEventListener('click', (e) => {
        setTimeout(() => URL.revokeObjectURL(url), 100);
    });
    
    return link;
}

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
    if (slider.min == slider.max) {
        slider.style.background = "#f2f2f2";
    }
}

function dateToUnix(dateString) {
    // Create a new Date object from the input date string
    const date = new Date(dateString);
    
    // Get the Unix time in milliseconds, then convert it to seconds
    const unixTimeInSeconds = Math.floor(date.getTime() / 1000);
    
    return unixTimeInSeconds;
  }

  function unixToDate(unixTimeInSeconds) {
    // Convert seconds to milliseconds
    const date = new Date(unixTimeInSeconds * 1000);
    return date.toLocaleString();  // Returns the date in a human-readable format
  }

  function getRequiredPayment(payment, multiplier, duration, stakedAmount) {
    var requiredPayment = (multiplier * (payment**(duration) * stakedAmount - (stakedAmount)));

    if (requiredPayment > walletIlis && lock == false) {
        document.getElementById('ilis-reward').style.color = "red";
    } else {
        document.getElementById('ilis-reward').style.color = "";
    }

    return requiredPayment;
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
            destination: `https://dashboard.radixdlt.com/transaction/${txId}`,
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

function setLbpSwapButton() {
    var swapButton = document.getElementById('sell');
    var enable = true;
    console.log(walletIlis, walletXrd);
    if (isConnected == false) {
        enable = false;
        console.log("numba1");
    } else if (lbpSell == true && parseFloat(document.getElementById('amount-sell').value) > walletXrd) {
        enable = false;
        console.log("numba2");
        console.log(lbpSell);
    } else if (lbpSell == false && parseFloat(document.getElementById('amount-sell').value) > walletIlis) {
        enable = false;
        console.log("numba3");
        console.log(lbpSell);
    } else if (document.getElementById('amount-sell').value == '') {
        enable = false;
        console.log("numba4");
    } else if (parseFloat(document.getElementById('amount-sell').value) == 0) {
        enable = false;
        console.log("numba5");
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
    var message = "";
    if (isConnected == false) {
        enable = false;
    } else if (parseFloat(document.getElementById('amount-stab-provide-lp').value) > walletStab) {
        enable = false;
        message = "Not enough STAB in wallet."
    } else if (parseFloat(document.getElementById('amount-xrd-provide-lp').value) > walletXrd) {
        enable = false;
        message = "Not enough XRD in wallet."
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

    if (message != "") {
        document.getElementById("provide-warning").style.display = "block";
        document.getElementById("provide-warning-text").textContent = message;
    } else {
        document.getElementById("provide-warning").style.display = "none";
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
    } else if (parseFloat(debtAmount) > walletStab && status != "Closed") {
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
    console.log(newCr);
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
        console.log("1");
    } else if (status == "Liquidated" || status == "ForceLiquidated" || status == "Closed") {
        enable = false;
        console.log("2");
    } else if (newCr < 150) {
        enable = false;
        onlyButton = true;
        console.log("3");
        document.getElementById('new-cr').style.color = "red";
    } else if (document.getElementById('amount-to-remove').value == '' || parseFloat(document.getElementById('amount-to-remove').value) == 0) {
        enable = false;
        onlyButton = true;
        zeroInput = true;
        console.log("4");
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
    } else if (parseFloat(document.getElementById('amount-to-remove-debt').value) > walletStab && addingDebt == false) {
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

function setStakeButton() {
    var stakeButton = document.getElementById('add-stake-button');
    var unstakeButton = document.getElementById('remove-stake-button');
    var enableButton = true;
    var enableInput = true;
    var message = "";
    var infoMessage = "";
    if (isConnected == false) {
        enableButton = false;
        enableInput = false;
    }
    if (selectedId == undefined) {
        enableButton = false;
        enableInput = false;
    }
    if (document.getElementById('amount-to-stake').value == '' || parseFloat(document.getElementById('amount-to-stake').value) == 0) {
        enableButton = false;
    }
    if (walletIlis == 0 && stake == true && window.location.pathname == "/membership") {
        enableButton = false;
        enableInput = false;
        if (selectedId) {
            message = "No ILIS to stake in wallet.";
        }
    }
    if (walletResource == 0 && stake == true && window.location.pathname == "/incentives") {
        enableButton = false;
        enableInput = false;
        if (selectedId) {
            message = "No resource to stake in wallet.";
        }
    }
    if ((amountStaked == 0 || amountStaked == undefined) && stake == false) {
        enableButton = false;
        enableInput = false;
        if (selectedId) {
            message = "No stake to remove.";
        }
    }
    if (stake == false && lockedUntil > nowLbpTime) {
        enableButton = false;
        enableInput = false;
        if (selectedId) {
            message = "Stake is locked.";
        }
    }
    if (stake == false && votingUntil > nowLbpTime && window.location.pathname == "/membership") {
        enableButton = false;
        enableInput = false;
        if (selectedId) {
            message = "ID is voting.";
        }
    }
    if (stake == true && votingUntil > nowLbpTime && window.location.pathname == "/membership" && (document.getElementById('amount-to-stake').value != '' && parseFloat(document.getElementById('amount-to-stake').value) != 0)) {
        infoMessage = "Be careful, this ID is currently voting. Proposals you have already voted on will NOT be affected by your increase in voting power, and votes are non-updatable!";
    }
    if (stake == true && lockedUntil > nowLbpTime && (document.getElementById('amount-to-stake').value != '' && parseFloat(document.getElementById('amount-to-stake').value) != 0)) {
        if (selectedId) {
            infoMessage = "Be careful, stake in this ID is locked. Staking more to this ID will automatically lock up the new stake too, though you will receive appropriate rewards.";
        }
    }
    if (claimablePeriods != 0) {
        enableButton = false;
        enableInput = false;
        if (stake == true) {
            message = "Cannot stake while having periods to claim.";
        } else {
            message = "Please claim your periods before unstaking.";
        }
    }
    if (enableButton) {
        stakeButton.style.backgroundColor = "";
        stakeButton.disabled = false;
        unstakeButton.style.backgroundColor = "";
        unstakeButton.disabled = false;
    } else {
        stakeButton.style.backgroundColor = "hsl(0, 0%, 0%)";
        stakeButton.disabled = true;
        unstakeButton.style.backgroundColor = "hsl(0, 0%, 0%)";
        unstakeButton.disabled = true;
    }
    if (enableInput) {
        document.getElementById('slider-stake').disabled = false;
        document.getElementById('amount-to-stake').disabled = false;
        document.getElementById('max-new-stake').classList.add("clickable");
        document.getElementById('max-new-stake').style.cursor = 'pointer';
        document.getElementById('max-new-stake').disabled = false;
    } else {
        document.getElementById('slider-stake').disabled = true;
        document.getElementById('amount-to-stake').disabled = true;
        document.getElementById('max-new-stake').classList.remove("clickable");
        document.getElementById('max-new-stake').style.cursor = 'default';
        document.getElementById('max-new-stake').disabled = true;
    }
    if (message != "") {
        document.getElementById('warning-box-stake').style.display = 'block';
        document.getElementById('warning-message-stake').textContent = message;
    } else {
        document.getElementById('warning-box-stake').style.display = 'none';
    }
    if (infoMessage != "") {
        document.getElementById('info-box-stake').style.display = 'block';
        document.getElementById('info-message-stake').textContent = infoMessage;
    } else {
        document.getElementById('info-box-stake').style.display = 'none';
    }
}

function setLockButton() {
    var lockButton = document.getElementById('add-lock-button');
    var unlockButton = document.getElementById('remove-lock-button');
    var enableButton = true;
    var enableInput = true;
    var message = "";
    if (isConnected == false) {
        enableButton = false;
        enableInput = false;
    }
    if (selectedId == undefined) {
        enableButton = false;
        enableInput = false;
    }
    if (document.getElementById('days-to-lock').value == '' || parseFloat(document.getElementById('days-to-lock').value) == 0) {
        enableButton = false;
    }
    if (walletIlis == 0 && lock == false) {
        enableButton = false;
        enableInput = false;
        if (selectedId) {
            message = "No ILIS to pay unlock fee.";
        }
    }
    if (walletIlis < currentRequiredPayment && lock == false) {
        enableButton = false;
        if (selectedId) {
            message = "Insufficient ILIS in wallet.";
        }
    }
    if ((amountStaked == 0 || amountStaked == undefined)) {
        enableButton = false;
        enableInput = false;
        if (selectedId) {
            message = "No stake to lock.";
        }
    }
    if (lock == false && lockNow == 0) {
        enableButton = false;
        enableInput = false;
        if (selectedId) {
            message = "Stake not locked.";
        }
    }
    if (enableButton) {
        lockButton.style.backgroundColor = "";
        lockButton.disabled = false;
        unlockButton.style.backgroundColor = "";
        unlockButton.disabled = false;
    } else {
        lockButton.style.backgroundColor = "hsl(0, 0%, 0%)";
        lockButton.disabled = true;
        unlockButton.style.backgroundColor = "hsl(0, 0%, 0%)";
        unlockButton.disabled = true;
    }
    if (enableInput) {
        document.getElementById('slider-lock').disabled = false;
        document.getElementById('days-to-lock').disabled = false;
        document.getElementById('max-new-lock').classList.add("clickable");
        document.getElementById('max-new-lock').style.cursor = 'pointer';
        document.getElementById('max-new-lock').disabled = false;
    } else {
        document.getElementById('slider-lock').disabled = true;
        document.getElementById('days-to-lock').disabled = true;
        document.getElementById('max-new-lock').classList.remove("clickable");
        document.getElementById('max-new-lock').style.cursor = 'default';
        document.getElementById('max-new-lock').disabled = true;
    }
    if (message != "") {
        document.getElementById('warning-message-lock').textContent = message;
        document.getElementById('warning-box-lock').style.display = 'block';
    } else {
        document.getElementById('warning-box-lock').style.display = 'none';
    }
}

function setNewIdButton() {
    var newIdButton = document.getElementById('new-id');
    var enableButton = true;
    if (isConnected == false) {
        enableButton = false;
    }
    if (enableButton) {
        newIdButton.style.backgroundColor = "";
        newIdButton.disabled = false;
    } else {
        newIdButton.style.backgroundColor = "hsl(0, 0%, 0%)";
        newIdButton.disabled = true;
    }
}

function setUnstakeFinishButton() {
    var unstakeFinishButton = document.getElementById('claim-unstaked-button');
    var enableButton = true;
    if (isConnected == false) {
        enableButton = false;
    }
    if (totalReadyToUnstake == 0) {
        enableButton = false;
    }
    if (enableButton) {
        unstakeFinishButton.style.backgroundColor = "";
        unstakeFinishButton.disabled = false;
    } else {
        unstakeFinishButton.style.backgroundColor = "hsl(0, 0%, 0%)";
        unstakeFinishButton.disabled = true;
    }
}

function setClaimButton() {
    if (window.location.pathname == "/incentives") {
        var claimButton = document.getElementById('claim-periods-button');
        var enableButton = true;
        if (isConnected == false) {
            enableButton = false;
        }
        if (claimablePeriods == 0) {
            enableButton = false;
        }
        if (selectedId == undefined) {
            enableButton = false;
        }
        if (enableButton) {
            claimButton.style.backgroundColor = "";
            claimButton.disabled = false;
        } else {
            claimButton.style.backgroundColor = "hsl(0, 0%, 0%)";
            claimButton.disabled = true;
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

function getWeights() {
    lbpProgress = (nowLbpTime - lbpStartTime) / lbpDuration;
    if (lbpProgress > 1) {
        lbpProgress = 1;
    }
    ilisWeight = initialIlisWeight + (0.5 - initialIlisWeight) * lbpProgress;
    xrdWeight = initialXrdWeight + (0.5 - initialXrdWeight) * lbpProgress;
}

function calculateLbpChange() {
    getWeights();
    console.log("wehere");
    if (lbpEnded == false) {
        setLbpSwapButton();
        var inputAmount = parseFloat(document.getElementById('amount-sell').value);
        var parsedIlisPoolAmount = parseFloat(ilisLbpPoolAmount);
        var parsedXrdPoolAmount = parseFloat(xrdLbpPoolAmount);
        var percentage = document.getElementById('percentage-change');
        let swapReceive = document.getElementById('amount-receive');
        if (isNaN(inputAmount)) {
            inputAmount = 0;
        }
        if (lbpSell == true) {
            let outputAmount = (parsedIlisPoolAmount * (1 - feeLbp) * inputAmount * xrdWeight)
                / (parsedXrdPoolAmount * ilisWeight + inputAmount * xrdWeight * (1 - feeLbp));
            swapReceive.value = outputAmount;
            var newparsedXrdPoolAmount = parsedXrdPoolAmount + inputAmount;
            var newparsedIlisPoolAmount = parsedIlisPoolAmount - outputAmount;
            var percentageChange = ((((newparsedXrdPoolAmount / newparsedIlisPoolAmount) - (parsedXrdPoolAmount / parsedIlisPoolAmount)) / (parsedXrdPoolAmount / parsedIlisPoolAmount))) * 100;
            var idealRatio = internalPrice / xrdPrice;
            percentage.style.color = "green";
            document.getElementById('percentage-change').childNodes[0].nodeValue = "+" + percentageChange.toFixed(2) + "%";
        } else {
            let outputAmount = (parsedXrdPoolAmount * (1 - feeLbp) * inputAmount * ilisWeight)
                / (parsedIlisPoolAmount * xrdWeight + inputAmount * ilisWeight * (1 - feeLbp));
            swapReceive.value = outputAmount;
            var newparsedXrdPoolAmount = parseFloat(parsedXrdPoolAmount) - outputAmount;
            var newparsedIlisPoolAmount = parseFloat(parsedIlisPoolAmount) + inputAmount;
            var percentageChange = ((((newparsedIlisPoolAmount / newparsedXrdPoolAmount) - (parsedIlisPoolAmount / parsedXrdPoolAmount)) / (parsedIlisPoolAmount / parsedXrdPoolAmount))) * 100;
            var idealRatio = internalPrice / xrdPrice;
            percentage.style.color = "red";
            document.getElementById('percentage-change').childNodes[0].nodeValue = "+" + percentageChange.toFixed(2) + "%";
        }
    } else {
        document.getElementById('swap-widget').style.display = "none";
        document.getElementById('lbp-status').style.display = "block";
        document.getElementById('lbp-end-text').style.display = "block";
    }
}

function parseLbpLedger(response) {
    // Check if the response has the expected structure
    if (!response.entries || response.entries.length === 0 || !response.entries[0].value || !response.entries[0].value.programmatic_json) {
        console.error('Unexpected API response structure');
        return [];
    }

    // Initialize an array to hold all parsed elements
    const allParsedElements = [];

    // Iterate over each entry in the response
    response.entries.forEach(entry => {
        const elements = entry.value.programmatic_json.elements;

        // Map each element to the desired format
        const parsedElements = elements.map(element => {
            if (element.fields && element.fields.length === 2) {
                const [firstField, secondField] = element.fields;

                if (secondField.fields && secondField.fields.length === 2) {
                    return [
                        parseFloat(firstField.value),
                        [
                            parseFloat(secondField.fields[0].value),
                            parseFloat(secondField.fields[1].value)
                        ]
                    ];
                }
            }

            console.error('Unexpected element structure', element);
            return null;
        }).filter(item => item !== null); // Remove any null items if parsing failed

        // Concatenate the parsed elements to the allParsedElements array
        allParsedElements.push(...parsedElements);
    });

    return allParsedElements; // Return the combined results
}

async function checkMarking(amount) {
    // URL to get the gateway status
    const statusUrl = "https://mainnet.radixdlt.com/status/gateway-status";

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
        const url = "https://mainnet.radixdlt.com/transaction/preview";

        // Base manifest string
        let manifestString = '';

        // Repeat the specified part of the manifest
        const repeatManifest = `
            CALL_METHOD
                Address("${proxyComponentAddress}")
                "mark_for_liquidation"
                Address("${xrdAddress}")
                ;
            `;

        for (let i = 0; i < amount; i++) {
            manifestString += repeatManifest;
        }

        // Add the remaining part of the manifest
        manifestString += `
            CALL_METHOD
                Address("account_rdx12x96pjxqazraqf2f9pdqxsl0a2mpzgep6dfny039dhv8ksd33gc52m")
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
    const statusUrl = "https://mainnet.radixdlt.com/status/gateway-status";

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
        const url = "https://mainnet.radixdlt.com/transaction/preview";

        // Repeat the specified part of the manifest
        let manifest = `CALL_METHOD
            Address("account_rdx12x96pjxqazraqf2f9pdqxsl0a2mpzgep6dfny039dhv8ksd33gc52m")
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
            Address("${proxyComponentAddress}")
            "liquidate_position_without_marker"
            Bucket("stab")
            true
            ${toSkip}i64
            NonFungibleLocalId("#0#");

        CALL_METHOD
            Address("account_rdx12x96pjxqazraqf2f9pdqxsl0a2mpzgep6dfny039dhv8ksd33gc52m")
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

function extractErrorMessage(errorString) {
    const regex = /PanicMessage\("([^@]+)@/;
    const match = errorString.match(regex);
    if (match && match[1]) {
        return match[1].trim();
    }
    return "Unknown error";
}

async function checkVoting() {
    var voteButton = document.getElementById('vote-button');

    if (isConnected == false) {
        voteButton.style.backgroundColor = "hsl(0, 0%, 0%)";
        voteButton.disabled = true;
        return;
    }
    if (selectedId == undefined) {
        voteButton.style.backgroundColor = "hsl(0, 0%, 0%)";
        voteButton.disabled = true;
        return;
    }
    // URL to get the gateway status
    const statusUrl = "https://mainnet.radixdlt.com/status/gateway-status";

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
        const url = "https://mainnet.radixdlt.com/transaction/preview";

        // Base manifest string
        
        let manifestString = `
            CALL_METHOD
            Address("${accountAddress}")
            "create_proof_of_non_fungibles"
            Address("${membershipIdAddress}")
            Array<NonFungibleLocalId>(
                NonFungibleLocalId("${selectedId}")
            )
            ;

            POP_FROM_AUTH_ZONE
            Proof("id_proof")
            ;

            CALL_METHOD
            Address("${governanceAddress}")
            "vote_on_proposal"
            ${proposalToView}u64
            ${vote}
            Proof("id_proof")
            ;
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
                "disable_auth_checks": false,
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
        console.log("let's go");
        console.log(responseData);
        if (responseData.receipt.status != "Succeeded") {
            var errorMessage = extractErrorMessage(responseData.receipt.error_message);
            console.log(errorMessage);
            document.getElementById('warning-vote-text').textContent = errorMessage;
            document.getElementById('warning-vote').style.display = 'block';
            voteButton.style.backgroundColor = "hsl(0, 0%, 0%)";
            voteButton.disabled = true;
        } else {
            document.getElementById('warning-vote').style.display = 'none';
            voteButton.style.backgroundColor = "";
            voteButton.disabled = false;
        }
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}

async function update_id() {
    if (window.location.pathname === '/membership') {
        let request = {
            "resource_address": membershipIdAddress,
            "non_fungible_ids": [selectedId],
        };
        if (selectedId != undefined) {
            document.getElementById('warning-message-id-select').style.display = 'none';
            await fetch("https://mainnet.radixdlt.com/state/non-fungible/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                amountStaked = data.non_fungible_ids[0].data.programmatic_json.fields[0].value;
                document.getElementById('staked-ilis').textContent = (amountStaked * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 2 });
                poolIlisDelegatedToMe = data.non_fungible_ids[0].data.programmatic_json.fields[1].value;
                var lockedUntilOption = data.non_fungible_ids[0].data.programmatic_json.fields[3].variant_name;
                if (lockedUntilOption == "Some") {
                    lockedUntil = data.non_fungible_ids[0].data.programmatic_json.fields[3].fields[0].value;
                    if (lockedUntil > nowLbpTime) {
                        document.getElementById('locked-until').textContent = new Date(lockedUntil * 1000).toLocaleString();
                    } else {
                        document.getElementById('locked-until').textContent = "Not locked";
                    }
                } else {
                    document.getElementById('locked-until').textContent = "Not locked";
                    lockedUntil = nowLbpTime;
                }
                var votingUntilOption = data.non_fungible_ids[0].data.programmatic_json.fields[4].variant_name;
                if (votingUntilOption == "Some") {
                    votingUntil = data.non_fungible_ids[0].data.programmatic_json.fields[4].fields[0].value;
                    if (votingUntil > nowLbpTime) {
                        document.getElementById('voting-until').textContent = new Date(votingUntil * 1000).toLocaleString();
                    } else {
                        document.getElementById('voting-until').textContent = "Not voting";
                    }
                } else {
                    document.getElementById('voting-until').textContent = "Not voting";
                    votingUntil = nowLbpTime;
                }
                var ilisUndelegatingUntilOption = data.non_fungible_ids[0].data.programmatic_json.fields[5].variant_name;
                if (ilisUndelegatingUntilOption == "Some") {
                    ilisUndelegatingUntil = data.non_fungible_ids[0].data.programmatic_json.fields[5].fields[0].value;
                    if (ilisUndelegatingUntil > nowLbpTime) {
                        document.getElementById('voting-until').textContent = new Date(ilisUndelegatingUntil * 1000).toLocaleString();
                    }
                }
                var ilisDelegatingToOption = data.non_fungible_ids[0].data.programmatic_json.fields[2].variant_name;
                if (ilisDelegatingToOption == "Some") {
                    ilisDelegatingTo = data.non_fungible_ids[0].data.programmatic_json.fields[2].fields[0].value;
                    document.getElementById('voting-until').textContent = "Delegating to " + ilisDelegatingTo;
                }
            })
            .catch(error => console.error('Error:', error));

            document.getElementById('amount-to-stake').value = 0;
            document.getElementById('days-to-lock').value = 0;
            document.getElementById('ilis-reward').textContent = 0;

            if (stake == true) {
                document.getElementById('max-new-stake').textContent = "max. " + (parseFloat(walletIlis)).toLocaleString('en-US', { maximumFractionDigits: 2 }) + " ILIS";
                document.getElementById('new-stake').textContent = (parseFloat(amountStaked) * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 2 });
            } else {
                document.getElementById('max-new-stake').textContent = "Unstake all";
                document.getElementById('new-stake').textContent = (parseFloat(amountStaked) * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 2 });
            }

            lockNow = Math.max(0, ((lockedUntil - nowLbpTime) / 60 / 60 / 24));

            if (lock == true) {
                var maxLockDaysSeconds = (nowLbpTime + 365 * 24 * 60 * 60) - lockedUntil;
                maxLockDaysFloor = Math.floor(maxLockDaysSeconds / (60 * 60 * 24));
                document.getElementById('max-new-lock').textContent = "max. " + maxLockDaysFloor + " days";
                document.getElementById('new-lock').textContent = lockNow.toFixed(2);
            } else {
                var maxUnlockDaysSeconds = lockedUntil - nowLbpTime;
                maxUnlockDaysCeil = Math.ceil(maxUnlockDaysSeconds / (60 * 60 * 24));
                document.getElementById('max-new-lock').textContent = "max. " + maxUnlockDaysCeil + " days";
                document.getElementById('new-lock').textContent = lockNow.toFixed(2);
            }
        } else {
            document.getElementById('warning-message-id-select').style.display = 'block';
        }
        let request2 = {
            "resource_address": membershipUnstakeAddress,
            "non_fungible_ids": membership_unstake_receipts,
        };

        totalInUnstaking = 0;
        totalReadyToUnstake = 0;
        idsReadyToUnstake = [];

        if (membership_unstake_receipts.length > 0) {
            await fetch("https://mainnet.radixdlt.com/state/non-fungible/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request2)
            })
            .then(response => response.json())
            .then(data => {
                totalInUnstaking = 0;
                totalReadyToUnstake = 0;
                idsReadyToUnstake = [];
                data.non_fungible_ids.forEach(receipt => {
                    if (!receipt.is_burned && receipt.data && receipt.data.programmatic_json) {
                        const fields = receipt.data.programmatic_json.fields;
                        const amount = parseFloat(fields[0].value);
                        const redemptionTime = parseInt(fields[1].value);

                        totalInUnstaking += parseFloat(amount);

                        if (redemptionTime < nowLbpTime) {
                            totalReadyToUnstake += amount;
                            idsReadyToUnstake.push(receipt.non_fungible_id);
                        }
                    }
                });
            })
            .catch(error => console.error('Error:', error));
        }

        document.getElementById('unstake-ready').textContent = totalReadyToUnstake.toLocaleString('en-US', { maximumFractionDigits: 1 }) +
                                                                "/" +
                                                                totalInUnstaking.toLocaleString('en-US', { maximumFractionDigits: 1 });
        console.log(totalInUnstaking);

        var sliderStake = document.getElementById('slider-stake');
        var sliderLock = document.getElementById('slider-lock');

        if (stake) {
            var maxStake = parseFloat(walletIlis);
            sliderStake.min = 0;
            sliderStake.max = maxStake;
            sliderStake.value = 0;
        } else {
            var maxUnstake = parseFloat(amountStaked) * poolMultiplier;
            sliderStake.min = 0;
            sliderStake.max = maxUnstake;
            sliderStake.value = 0; // Set the value to the min value
        }

        if (lock) {
            var maxLock = maxLockDaysFloor;
            sliderLock.min = 0;
            sliderLock.max = maxLock;
            sliderLock.value = 0;
        } else {
            var maxUnlock = maxUnlockDaysCeil;
            sliderLock.min = 0;
            sliderLock.max = maxUnlock;
            sliderLock.value = 0;
        }

        updateSliderBackground(sliderStake);
        updateSliderBackground(sliderLock);
        setStakeButton();
        setLockButton();
        setClaimButton();
        setNewIdButton();
        setUnstakeFinishButton();
    }
}

async function fetchData(address) {
    const url_fetch_ids = "https://mainnet.radixdlt.com/state/entity/details";
    const addresses = [address, proxyComponentAddress, poolComponentAddress, stabAddress,
                        poolAddress, stakingAddress, lbpPoolAddress, lbpComponentAddress,
                        incentiveAddress, governanceAddress, daoAddress, ilisPool,
                        poolIlisAddress, stabComponentAddress, lpAddress];

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

    if (address !== "account_rdx12x96pjxqazraqf2f9pdqxsl0a2mpzgep6dfny039dhv8ksd33gc52m") {
        accountAddress = address;
        if (window.location.pathname !== "/deployment") {
            restoreButtonLabels();
        }
    } else {
        isConnected = false;
        walletStab = 0;
        walletIlis = 0;
        walletResource = 0;
        walletXrd = 0;
        walletLp = 0;
        selectedCdp = undefined;
        selectedMarker = undefined;
        selectedId = undefined;
        accountAddress = "account_rdx12x96pjxqazraqf2f9pdqxsl0a2mpzgep6dfny039dhv8ksd33gc52m"
    }
    stab_ids = []
    cdp_ids = []
    marker_ids = []
    incentive_ids = []
    membership_unstake_receipts = []
    incentive_unstake_receipts = []
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
                    if (nfrItem.resource_address === membershipIdAddress && nfrItem.vaults) {
                        nfrItem.vaults.items.forEach(vault => {
                            stab_ids = stab_ids.concat(vault.items.filter(item => !stab_ids.includes(item)));
                        });
                    }
                    if (nfrItem.resource_address === cdpAddress && nfrItem.vaults) {
                        nfrItem.vaults.items.forEach(vault => {
                            cdp_ids = cdp_ids.concat(vault.items.filter(item => !cdp_ids.includes(item)));
                        });
                    }
                    if (nfrItem.resource_address === markerAddress && nfrItem.vaults) {
                        nfrItem.vaults.items.forEach(vault => {
                            marker_ids = marker_ids.concat(vault.items.filter(item => !marker_ids.includes(item)));
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
            await fetch('https://mainnet.radixdlt.com/state/non-fungible/data', {
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

        const timeResponse = await fetch('https://mainnet.radixdlt.com/status/gateway-status', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // Include any necessary body data in string format
        });
        const timeData = await timeResponse.json();
        nowLbpTime = dateToUnix(timeData.ledger_state.proposer_round_timestamp);

        if (window.location.pathname === '/lbp') {
            let ledgerKvs = sortedItems[7].details.state.fields[19].value;
            let ledgerCounter = parseInt(sortedItems[7].details.state.fields[20].value);
            let kvsHexesToUse;

            if (typeof ledgerCounter === 'number' && ledgerCounter >= 0 && Number.isInteger(ledgerCounter)) {
                // Take ledgerCounter + 1 hexes, but not more than the total available
                kvsHexesToUse = lbpKvsHexes.slice(0, Math.min(ledgerCounter + 1, lbpKvsHexes.length));
            } else {
                // Handle unexpected ledgerCounter values
                console.error('Unexpected ledgerCounter value:', ledgerCounter);
                kvsHexesToUse = [];
            }

            const ledgerKvsRequest = {
                "key_value_store_address": ledgerKvs,
                "keys": [
                    ...kvsHexesToUse.map(hex => ({ "key_hex": hex })), // Map each hex to an object
                    {
                        "key_json": {
                            "kind": "Tuple",
                            "fields": [
                                {
                                    "kind": "U32",
                                    "value": "1"
                                }
                            ]
                        }
                    }
                ]
            };

            const ledgerState = await fetch('https://mainnet.radixdlt.com/state/key-value-store/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ledgerKvsRequest)
            });

            const ledgerStateData = await ledgerState.json();
            console.log("supmydude");
            console.log(ledgerStateData);
            ledgerData = parseLbpLedger(ledgerStateData);
        }
        return sortedItems;
    } catch (error) {
        console.error('Error:', error);
    }
}

async function update_governance() {
    if (window.location.pathname === '/governance') {
        let request = {
            "resource_address": membershipIdAddress,
            "non_fungible_ids": [selectedId],
        };
        if (selectedId != undefined) {
            document.getElementById('warning-message-id-select').style.display = 'none';
            await fetch("https://mainnet.radixdlt.com/state/non-fungible/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                amountStaked = data.non_fungible_ids[0].data.programmatic_json.fields[0].value;
                poolIlisDelegatedToMe = data.non_fungible_ids[0].data.programmatic_json.fields[1].value;
                console.log(amountStaked);
                console.log(poolIlisDelegatedToMe);
                document.getElementById('vote-power').textContent = ((parseFloat(amountStaked) + parseFloat(poolIlisDelegatedToMe)) * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 2 });
                var ilisUndelegatingUntilOption = data.non_fungible_ids[0].data.programmatic_json.fields[5].variant_name;
                if (ilisUndelegatingUntilOption == "Some") {
                    ilisUndelegatingUntil = data.non_fungible_ids[0].data.programmatic_json.fields[5].fields[0].value;
                    if (ilisUndelegatingUntil > nowLbpTime) {
                        document.getElementById('vote-power').textContent = "Undelegating until " + new Date(ilisUndelegatingUntil * 1000).toLocaleString();
                    }
                }
                var ilisDelegatingToOption = data.non_fungible_ids[0].data.programmatic_json.fields[2].variant_name;
                if (ilisDelegatingToOption == "Some") {
                    ilisDelegatingTo = data.non_fungible_ids[0].data.programmatic_json.fields[2].fields[0].value;
                    document.getElementById('vote-power').textContent = "Delegating to " + ilisDelegatingTo;
                }
            })
            .catch(error => console.error('Error:', error));

        } else {
            document.getElementById('warning-message-id-select').style.display = 'block';
        }

        if (proposalToView == 2 || proposalToView == -1) {

        }

        if (maxProposals >= 0 && proposalToView != -1) {
            let request2 = {
                "key_value_store_address": proposalsKvs,
                "keys": [
                {
                    "key_hex": `${generateKey(proposalToView)}`
                },
                {
                    "key_json": {
                    "kind": "Tuple",
                    "fields": [
                        {
                        "kind": "U32",
                        "value": "1"
                        }
                    ]
                    }
                }
                ]
            };

            await fetch("https://mainnet.radixdlt.com/state/key-value-store/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request2)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                var proposalData = data.entries[0].value.programmatic_json.fields;
                document.getElementById('proposal-title').textContent = "Proposal #" + proposalToView + ": " + proposalData[0].value;
                document.getElementById('proposal-description').textContent = proposalData[1].value;
                var status = proposalData[10].variant_name;
                document.getElementById('status').textContent = status;
                document.getElementById('deadline').textContent = new Date(parseInt(proposalData[7].value) * 1000).toLocaleString();
                var votesFor = proposalData[4].value;
                var votesAgainst = proposalData[5].value;
                var totalVotes = parseFloat(votesFor) + parseFloat(votesAgainst);
                if (status != "Building") {
                    document.getElementById('votes-for').textContent = parseFloat(votesFor * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 2 }) + " (" + ((votesFor / totalVotes) * 100).toFixed(2) + "%)";
                    document.getElementById('votes-against').textContent = parseFloat(votesAgainst * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 2 }) + " (" + ((votesAgainst / totalVotes) * 100).toFixed(2) + "%)";
                } else {
                    document.getElementById('votes-for').textContent = "-";
                    document.getElementById('votes-against').textContent = "-";
                }
                document.getElementById('quorum').textContent = parseFloat(totalVotes * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 2 }) + " / " + parseFloat(quorum).toLocaleString('en-US', { maximumFractionDigits: 2 });
            
                if (proposalData[2].variant_name == "Some") {
                    const attachmentList = proposalData[2].fields[0].elements;
                    const downloadLinks = generateDownloadLinks(attachmentList, baseLink);
                    displayAttachmentLinks(downloadLinks);
                } else {
                    document.getElementById('attachments').textContent = "-";
                }

                // Create download link
                const downloadLink = createStyledDownloadLink(data, 'proposal_data.json');
                const specificsElement = document.getElementById('specifics');
                specificsElement.innerHTML = ''; // Clear any existing content
                specificsElement.appendChild(downloadLink);
            })
            .catch(error => console.error('Error:', error));

            checkVoting();
        } else {
            var voteButton = document.getElementById('vote-button');
            voteButton.style.backgroundColor = "hsl(0, 0%, 0%)";
            voteButton.disabled = true;

            if (proposalToView == -1) {
                document.getElementById('proposal-title').textContent = "Proposal #-1: Transitioning to Advanced Smart Contract Package and Updating Operational Agreement";
                document.getElementById('proposal-description').textContent = "This proposal aims to transition the ILIS DAO to a more advanced smart contract package and update the operational agreement to reflect these changes. As the current sole owner of governance tokens, this proposal serves as a formal declaration of intent and a record of the transition process.";
                document.getElementById('status').textContent = "Passed";
                document.getElementById('deadline').textContent = "N/A";
                var votesFor = 100000000;
                var votesAgainst = 0;
                var totalVotes = parseFloat(votesFor) + parseFloat(votesAgainst);
                document.getElementById('votes-for').textContent = parseFloat(votesFor).toLocaleString('en-US', { maximumFractionDigits: 2 }) + " (" + ((votesFor / totalVotes) * 100).toFixed(2) + "%)";
                document.getElementById('votes-against').textContent = parseFloat(votesAgainst * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 2 }) + " (" + ((votesAgainst / totalVotes) * 100).toFixed(2) + "%)";
                document.getElementById('quorum').textContent = "N/A";
                const downloadLinks = ["https://radix-files-mainnet.vercel.app/file/internal_keyvaluestore_rdx1krupls6a9x689fnkcpr7nt7n5xl8zmk7gvm2d6rmavxjs6z92dllhg/921fb2f9f9136488abe035d4278740dc7d9c0daffee822e8f1be4e5dba82046c"]
                displayAttachmentLinks(downloadLinks);
                const specificsElement = document.getElementById('specifics');
                specificsElement.innerHTML = '';
            }
        }
    }
}

async function update_incentives() {
    if (window.location.pathname === '/incentives') {
        let request = {
            "resource_address": incentiveIdAddress,
            "non_fungible_ids": [selectedId],
        };
        if (selectedId != undefined) {
            document.getElementById('warning-message-id-select').style.display = 'none';
            await fetch("https://mainnet.radixdlt.com/state/non-fungible/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const nftData = data.non_fungible_ids[0].data.programmatic_json.fields[0];
                var nextPeriod = data.non_fungible_ids[0].data.programmatic_json.fields[1].value;
                claimablePeriods = Math.max(0, currentIncentivePeriod - nextPeriod + 1);
                const resourceEntry = nftData.entries.find(entry => 
                    entry.key.value.startsWith(selectedResource)
                );
                console.log(resourceEntry);
                if (resourceEntry) {
                    amountStaked = resourceEntry.value.fields[0].value;
                    var lockedUntilOption = resourceEntry.value.fields[1].variant_name;
                    if (lockedUntilOption == "Some") {
                        lockedUntil = resourceEntry.value.fields[1].fields[0].value;
                        if (lockedUntil > nowLbpTime) {
                            document.getElementById('locked-until').textContent = new Date(lockedUntil * 1000).toLocaleString();
                        } else {
                            document.getElementById('locked-until').textContent = "Not locked";
                        }
                    } else {
                        document.getElementById('locked-until').textContent = "Not locked";
                        lockedUntil = nowLbpTime;
                }
                } else {
                    amountStaked = 0;
                    document.getElementById('locked-until').textContent = "-";
                    lockedUntil = nowLbpTime;
                }
                document.getElementById('staked').textContent = (amountStaked * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 2 });
                document.getElementById('periods-to-claim').textContent = claimablePeriods;
                
            })
            .catch(error => console.error('Error:', error));

            document.getElementById('amount-to-stake').value = 0;
            document.getElementById('days-to-lock').value = 0;
            document.getElementById('ilis-reward').textContent = 0;

            getWeights();
            var ilisPrice = ((parseFloat(xrdLbpPoolAmount) * parseFloat(ilisWeight)) / (parseFloat(ilisLbpPoolAmount) * parseFloat(xrdWeight))) * parseFloat(xrdLbpPrice);
            var reward = parseFloat(currentLpReward) * (parseFloat(amountStaked)) / (parseFloat(currentLpStaked));
            var rewardValue = parseFloat(reward) * parseFloat(ilisPrice);
            console.log(rewardValue);
            console.log(ilisPrice);

            if (stake == true) {
                document.getElementById('max-new-stake').textContent = "max. " + (parseFloat(walletResource)).toLocaleString('en-US', { maximumFractionDigits: 2 }) + " LPSTAB";
                document.getElementById('new-stake').textContent = (parseFloat(amountStaked) * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 2 }) + " LPSTAB";
                document.getElementById('staking-rewards').textContent = (reward).toLocaleString('en-US', { maximumFractionDigits: 2 }) + " ILIS (" + (100 * 52 * rewardValue / (parseFloat(lpStabValue) * (parseFloat(amountStaked)))).toFixed(1) + "% APY)";
                console.log(parseFloat(currentLpReward) * amountStaked / parseFloat(currentLpStaked));
            } else {
                document.getElementById('max-new-stake').textContent = "Unstake all";
                document.getElementById('new-stake').textContent = (parseFloat(amountStaked) * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 2 }) + " LPSTAB";
                document.getElementById('staking-rewards').textContent = (reward).toLocaleString('en-US', { maximumFractionDigits: 2 }) + " ILIS (" + (100 * 52 * rewardValue / (parseFloat(lpStabValue) * (parseFloat(amountStaked)))).toFixed(1) + "% APY)";
            }

            lockNow = Math.max(0, ((lockedUntil - nowLbpTime) / 60 / 60 / 24));

            if (lock == true) {
                var maxLockDaysSeconds = (nowLbpTime + 365 * 24 * 60 * 60) - lockedUntil;
                maxLockDaysFloor = Math.floor(maxLockDaysSeconds / (60 * 60 * 24));
                document.getElementById('max-new-lock').textContent = "max. " + maxLockDaysFloor + " days";
                document.getElementById('new-lock').textContent = lockNow.toFixed(2);
            } else {
                var maxUnlockDaysSeconds = lockedUntil - nowLbpTime;
                maxUnlockDaysCeil = Math.ceil(maxUnlockDaysSeconds / (60 * 60 * 24));
                document.getElementById('max-new-lock').textContent = "max. " + maxUnlockDaysCeil + " days";
                document.getElementById('new-lock').textContent = lockNow.toFixed(2);
            }
        } else {
            document.getElementById('warning-message-id-select').style.display = 'block';
        }
        let request2 = {
            "resource_address": incentiveUnstakeAddress,
            "non_fungible_ids": incentive_unstake_receipts,
        };

        totalInUnstaking = 0;
        totalReadyToUnstake = 0;
        idsReadyToUnstake = [];

        if (incentive_unstake_receipts.length > 0) {
            await fetch("https://mainnet.radixdlt.com/state/non-fungible/data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request2)
            })
            .then(response => response.json())
            .then(data => {
                totalInUnstaking = 0;
                totalReadyToUnstake = 0;
                idsReadyToUnstake = [];
                data.non_fungible_ids.forEach(receipt => {
                    if (!receipt.is_burned && receipt.data && receipt.data.programmatic_json) {
                        const fields = receipt.data.programmatic_json.fields;
                        const amount = parseFloat(fields[1].value);
                        const redemptionTime = parseInt(fields[2].value);

                        totalInUnstaking += parseFloat(amount);

                        if (redemptionTime < nowLbpTime) {
                            totalReadyToUnstake += amount;
                            idsReadyToUnstake.push(receipt.non_fungible_id);
                        }
                    }
                });
            })
            .catch(error => console.error('Error:', error));
        }

        document.getElementById('unstake-ready').textContent = totalReadyToUnstake.toLocaleString('en-US', { maximumFractionDigits: 1 }) +
                                                                "/" +
                                                                totalInUnstaking.toLocaleString('en-US', { maximumFractionDigits: 1 });
        console.log(totalInUnstaking);

        var sliderStake = document.getElementById('slider-stake');
        var sliderLock = document.getElementById('slider-lock');

        if (stake) {
            var maxStake = parseFloat(walletResource);
            sliderStake.min = 0;
            sliderStake.max = maxStake;
            sliderStake.value = 0;
        } else {
            var maxUnstake = parseFloat(amountStaked) * poolMultiplier;
            sliderStake.min = 0;
            sliderStake.max = maxUnstake;
            sliderStake.value = 0; // Set the value to the min value
        }

        if (lock) {
            var maxLock = maxLockDaysFloor;
            sliderLock.min = 0;
            sliderLock.max = maxLock;
            sliderLock.value = 0;
        } else {
            var maxUnlock = maxUnlockDaysCeil;
            sliderLock.min = 0;
            sliderLock.max = maxUnlock;
            sliderLock.value = 0;
        }

        updateSliderBackground(sliderStake);
        updateSliderBackground(sliderLock);
        setStakeButton();
        setLockButton();
        setClaimButton();
        setNewIdButton();
        setUnstakeFinishButton();

        getWeights();
        var ilisPrice = ((parseFloat(xrdLbpPoolAmount) * parseFloat(ilisWeight)) / (parseFloat(ilisLbpPoolAmount) * parseFloat(xrdWeight))) * parseFloat(xrdLbpPrice);
        if (!selectedId) {
            var reward = parseFloat(currentLpReward) / (parseFloat(currentLpStaked));
            var rewardValue = parseFloat(reward) * parseFloat(ilisPrice);
            console.log((parseFloat(currentLpStaked) + parseFloat(stakingAmount)));
            document.getElementById("weekly-rewards-label").textContent = "APY";
            document.getElementById("staking-rewards").textContent = (100 * 52 * rewardValue / (parseFloat(lpStabValue))).toFixed(1) + "%";
        } else {
            document.getElementById("weekly-rewards-label").textContent = "Weekly rewards";
        }
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
                let response = await fetch("https://mainnet.radixdlt.com/state/non-fungible/data", {
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

                response = await fetch("https://mainnet.radixdlt.com/state/non-fungible/data", {
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
                    console.log(collateralAmount);
                    console.log(debtAmount);
                    console.log(validatorMultiplier);
                    upToDateCr = getUpToDateCr(collateralAmount, debtAmount, validatorMultiplier);
                    cr = upToDateCr * 100;
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
                    document.getElementById('cr').textContent = cr.toFixed(2) + "%";
                } else if (collateralName == "-") {
                    document.getElementById('collateralAmount').textContent = "";
                    document.getElementById('debtAmount').textContent = "-";
                    document.getElementById('cr').textContent = "-";
                    document.getElementById('status').style.color = 'red';
                } else {
                    document.getElementById('collateralAmount').textContent = (1 * collateralAmount).toFixed(2) + " " + collateralName;
                    document.getElementById('debtAmount').textContent = (1 * debtAmount).toFixed(2) + " STAB";
                    document.getElementById('cr').textContent = cr.toFixed(2) + "%";
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


        await fetch("https://mainnet.radixdlt.com/state/non-fungible/data", {
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
    networkId: network, // network ID 2 is for the mainnet test network 1 is for mainnet
    applicationName: dAppName,
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

    let url = "https://mainnet.radixdlt.com/state/entity/details";

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

    let url_2 = "https://mainnet.radixdlt.com/state/validators/list";
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

function useData(data) {
    if (window.location.pathname === "/deployment") {
        return;
    }
    bigData = data;
    console.log(data);
    var lbpEndStatus = data[7].details.state.fields[12].variant_name;
    if (lbpEndStatus === "Some") {
        lbpEnded = true;
    }
    collateralsKvs = data[13].details.state.fields[0].value;
    lbpLength = data[7].details.state.fields[8].value;
    lbpDuration = lbpLength * 24 * 60 * 60;
    lbpStartTime = data[7].details.state.fields[11].fields[0].value;
    internalPrice = data[1].details.state.fields[15].fields[4].value;
    console.log(data);
    xrdPrice = data[1].details.state.fields[10].value;
    xrdLbpPrice = data[1].details.state.fields[10].value;
    console.log(xrdPrice);
    if (window.location.pathname === '/membership' || window.location.pathname === '/governance') {
        poolMultiplier = data[11].fungible_resources.items[0].vaults.items[0].amount / data[12].details.total_supply;
        currentIlisReward = data[5].details.state.fields[7].fields[3].value;
        currentIlisStaked = data[5].details.state.fields[7].fields[1].value * poolMultiplier;
        console.log(currentIlisReward);
        console.log(currentIlisStaked);
        membershipApy = 365 * currentIlisReward / currentIlisStaked;
        if (window.location.pathname === '/membership') {
            document.getElementById('staking-rewards').textContent = (100 * membershipApy).toFixed(2) + "%";
        }
    } else {
        poolMultiplier = 1;
    }
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
                if (nfrItem.resource_address === membershipIdAddress && nfrItem.vaults) {
                    nfrItem.vaults.items.forEach(vault => {
                        stab_ids = stab_ids.concat(vault.items.filter(item => !stab_ids.includes(item)));
                    });
                }
                if (nfrItem.resource_address === cdpAddress && nfrItem.vaults) {
                    nfrItem.vaults.items.forEach(vault => {
                        cdp_ids = cdp_ids.concat(vault.items.filter(item => !cdp_ids.includes(item)));
                    });
                }
                if (nfrItem.resource_address === markerAddress && nfrItem.vaults) {
                    nfrItem.vaults.items.forEach(vault => {
                        marker_ids = marker_ids.concat(vault.items.filter(item => !marker_ids.includes(item)));
                    });
                }
                if (nfrItem.resource_address === membershipUnstakeAddress && nfrItem.vaults) {
                    nfrItem.vaults.items.forEach(vault => {
                        membership_unstake_receipts = membership_unstake_receipts.concat(vault.items);
                    });
                }
                if (nfrItem.resource_address === incentiveIdAddress && nfrItem.vaults) {
                    nfrItem.vaults.items.forEach(vault => {
                        incentive_ids = incentive_ids.concat(vault.items);
                    });
                }
                if (nfrItem.resource_address === incentiveUnstakeAddress && nfrItem.vaults) {
                    nfrItem.vaults.items.forEach(vault => {
                        incentive_unstake_receipts = incentive_unstake_receipts.concat(vault.items);
                    });
                }
            });
        }
    });

    console.log(data);
    walletIlis = getResourceAmount(ilisAddress, data, 0);
    walletResource = getResourceAmount(selectedResource, data, 0);
    walletXrd = getResourceAmount(xrdAddress, data, 0);
    walletLp = getResourceAmount(lpAddress, data, 0);
    walletStab = getResourceAmount(stabAddress, data, 0);
    xrdPoolAmount = getResourceAmount(xrdAddress, data, 4);
    stabPoolAmount = getResourceAmount(stabAddress, data, 4);
    if (lbpEnded == false) {
        xrdLbpPoolAmount = getResourceAmount(xrdAddress, data, 6);
        ilisLbpPoolAmount = getResourceAmount(ilisAddress, data, 6);
    }
    quorum = data[9].details.state.fields[9].fields[2].value;
    interestRate = (100 * ((data[1].details.state.fields[15].fields[6].value ** (24 * 60 * 365)) - 1)).toFixed(2);
    currentIncentivePeriod = data[8].details.state.fields[2].value;
    currentLpStaked = data[8].details.state.fields[12].entries[0].value.fields[1].value;
    currentLpReward = data[8].details.state.fields[12].entries[0].value.fields[3].value;
    maxProposals = data[9].details.state.fields[8].value - 1;
    proposalsKvs = data[9].details.state.fields[7].value;
    lpStabValue = 2 * xrdPrice * xrdPoolAmount / parseFloat(data[14].details.total_supply);

    if (proposalToView == -1 && window.location.pathname === '/governance') {
        document.getElementById('prop-id-counter').textContent = maxProposals;
        proposalToView = maxProposals;
    }

    if (window.location.pathname === '/' || window.location.pathname === '/secret_index' || window.location.pathname === '/index') {
        document.getElementById('interest-rate').textContent = interestRate;
        document.getElementById('circulating-counter').textContent = (1 * data[3].details.total_supply).toFixed(0);
        document.getElementById('price-counter').textContent = ((xrdPoolAmount / stabPoolAmount) * xrdPrice).toFixed(3);
    }

    if (window.location.pathname === '/swap') {
        calculateChange();
        setProvideButton();
        setRemoveLpButton();
        async function fetchData2() {
            try {
                const response = await fetch('https://mainnet.radixdlt.com/status/gateway-status', {
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

            const entityDetailsUrl = 'https://mainnet.radixdlt.com/state/entity/details';
            const entityPageUrl = 'https://mainnet.radixdlt.com/state/entity/page/fungibles';
            const customEntityDetailsUrl = 'https://mainnet.radixdlt.com/state/entity/details';

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
                    proxyComponentAddress
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
                var xrdPriceInitial = customDetailsData.items[0].details.state.fields[10].value;
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
                console.log(bigData);
                xrdPoolAmount = getResourceAmount(xrdAddress, bigData, 4);
                liqElement.textContent = "$" + Number((xrdPoolAmount * 2 * xrdPrice).toFixed(2)).toLocaleString('en-US');
                apyElement.textContent = dollarPerLpRatio2.toFixed(2) + "%";
                apyElement.style.color = dollarPerLpRatio2 > 0 ? 'green' : 'red';

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData2();

        if (sell == true) {
            formattedWallet = Math.floor(walletXrd * 10) / 10;
            document.getElementById('swap-sell-amount').textContent = "max. " + formattedWallet.toLocaleString('en-US');
        } else {
            if (walletIlis >= 0.1) {
                formattedWallet = Math.floor((walletIlis) * 10) / 10;
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

    if (window.location.pathname === '/lbp') {
        calculateLbpChange();
        document.getElementById('apy-real').textContent = (ilisWeight * 100).toFixed(1) + "/" + (xrdWeight * 100).toFixed(1);
        document.getElementById('progress').textContent = ((lbpDuration / 60 / 60 / 24) * lbpProgress).toFixed(2) + "/" + (lbpDuration / 60 / 60 / 24).toFixed(2) + " days";
        if (lbpEnded == false) {
            document.getElementById('current-fdv').textContent = "$"+((((xrdLbpPoolAmount * ilisWeight) / (ilisLbpPoolAmount * xrdWeight)) * 100000000) * xrdLbpPrice).toLocaleString('en-US', { maximumFractionDigits: 0 });
            document.getElementById('ilis-price').textContent = ((xrdLbpPoolAmount * ilisWeight) / (ilisLbpPoolAmount * xrdWeight)).toFixed(4) + " XRD = " + "$"+(((xrdLbpPoolAmount * ilisWeight) / (ilisLbpPoolAmount * xrdWeight)) * xrdLbpPrice).toFixed(5);
            document.getElementById('final-fdv').textContent = "$"+(((xrdLbpPoolAmount * 0.5) / (ilisLbpPoolAmount * 0.5)) * 100000000 * xrdLbpPrice).toLocaleString('en-US', { maximumFractionDigits: 0 });
            document.getElementById('ilis-price-final').textContent = (((xrdLbpPoolAmount * 0.5) / (ilisLbpPoolAmount * 0.5))).toFixed(4) + " XRD = $"+(((xrdLbpPoolAmount * 0.5) / (ilisLbpPoolAmount * 0.5)) * xrdLbpPrice).toFixed(5);
        } else {
            document.getElementById('current-fdv-line').style.display = "none";
            document.getElementById('ilis-price-line').style.display = "none";
            document.getElementById('final-fdv-text').textContent = "Final ILIS FDV";
            document.getElementById('ilis-price-final-text').textContent = "Final ILIS Price";
        }
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
            var subtext = "STAB Marker Receipt";

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

    if (window.location.pathname === '/membership') {
        var dropdownContent = document.querySelector('.dropdown-custom-content');
        dropdownContent.innerHTML = '';

        stab_ids.forEach(id => {
            var name = id;
            var logoUrl = 'images/staking-id.png'
            var subtext = "ILIS DAO Membership ID";

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
                dropdownButton.textContent = "Membership ID " + name;

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
            dropdownButton.textContent = "Select Membership ID";
            document.getElementById('staked-ilis').textContent = "-";
            document.getElementById('unstake-ready').textContent = "-";
            document.getElementById('locked-until').textContent = "-";
            document.getElementById('voting-until').textContent = "-";
            
            // set max stake and new stake to 0, and set locks to 0
        }
    }

    if (window.location.pathname === '/governance') {
        var dropdownContent = document.querySelector('.dropdown-custom-content');
        dropdownContent.innerHTML = '';

        stab_ids.forEach(id => {
            var name = id;
            var logoUrl = 'images/staking-id.png'
            var subtext = "ILIS DAO Membership ID";

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
                dropdownButton.textContent = "Membership ID " + name;

                // Hide the dropdown content
                var dropdownContent = document.querySelector('.dropdown-custom-content');
                dropdownContent.style.display = 'none';
                setChevron(dropdownContent);

                selectedId = id;

                update_governance();
            });

            // Append the new option to the dropdown content
            var dropdownContent = document.querySelector('.dropdown-custom-content');
            dropdownContent.appendChild(option);
        });

        if (selectedId !== undefined) {
            update_governance();
        } else {
            if (isConnected === false) {
                dropdownContent.innerHTML = '';
            }
            var dropdownButton = document.querySelector('.dropdown-custom-button b');
            dropdownButton.textContent = "Select Membership ID";
            document.getElementById('vote-power').textContent = "-";
            poolIlisDelegatedToMe = 0;
            amountStaked = 0;
        }
    }

    if (window.location.pathname === '/incentives') {
        var dropdownContent = document.querySelector('.dropdown-custom-content.id');
        dropdownContent.innerHTML = '';

        console.log(incentive_ids);

        incentive_ids.forEach(id => {
            var name = id;
            var logoUrl = 'images/staking-id.png'
            var subtext = "ILIS DAO Incentives ID";

            // Create a new option
            var option = document.createElement('div');
            option.className = 'dropdown-custom-option id';
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
                var options = document.querySelectorAll('.dropdown-custom-option.id');
                options.forEach(function (otherOption) {
                    otherOption.classList.remove('selected');
                });

                // Add the 'selected' class to the clicked option
                option.classList.add('selected');

                // Set the button text to the option title
                var dropdownButton = document.querySelector('.dropdown-custom-button.id b');
                dropdownButton.textContent = "Incentives ID " + name;

                // Hide the dropdown content
                var dropdownContent = document.querySelector('.dropdown-custom-content.id');
                dropdownContent.style.display = 'none';
                setChevron(dropdownContent);

                selectedId = id;

                update_incentives();
            });

            // Append the new option to the dropdown content
            var dropdownContent = document.querySelector('.dropdown-custom-content.id');
            dropdownContent.appendChild(option);
        });

        var dropdownContent2 = document.querySelector('.dropdown-custom-content.resource');
        dropdownContent2.innerHTML = '';

        console.log(incentive_ids);

        incentive_resources.forEach(id => {
            var name = id[0];
            var logoUrl = id[1];
            var subtext = "Incentivized Resource";

            // Create a new option
            var option = document.createElement('div');
            option.className = 'dropdown-custom-option resource';
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
                var options = document.querySelectorAll('.dropdown-custom-option.resource');
                options.forEach(function (otherOption) {
                    otherOption.classList.remove('selected');
                });

                // Add the 'selected' class to the clicked option
                option.classList.add('selected');

                // Set the button text to the option title
                var dropdownButton = document.querySelector('.dropdown-custom-button.resource b');
                dropdownButton.textContent = name;

                // Hide the dropdown content
                var dropdownContent = document.querySelector('.dropdown-custom-content.resource');
                dropdownContent.style.display = 'none';
                setChevron(dropdownContent);

                selectedResource = id[2];

                update_incentives();
            });

            if (name === "LPSTAB") {
                option.click();
            }

            // Append the new option to the dropdown content
            var dropdownContent = document.querySelector('.dropdown-custom-content.resource');
            dropdownContent.appendChild(option);
        });

        if (selectedId !== undefined) {
            update_incentives();
        } else {
            if (isConnected === false) {
                dropdownContent.innerHTML = '';
            }
            var dropdownButton = document.querySelector('.dropdown-custom-button.id b');
            dropdownButton.textContent = "Select Incentives ID";
            document.getElementById('staked').textContent = "-";
            document.getElementById('unstake-ready').textContent = "-";
            document.getElementById('locked-until').textContent = "-";
            
            // set max stake and new stake to 0, and set locks to 0
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
        fetch('https://mainnet.radixdlt.com/state/key-value-store/data', {
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

    // this has got to be the strangest code I've ever written
    // idk what the fuck it does anymore but it works...
    // this counter thing is moronic hahahaha
    if (window.location.pathname === '/manage-loans') {
        var dropdownContent = document.querySelector('.dropdown-custom-content');
        dropdownContent.innerHTML = '';
        var cdpExists = false;
        var counter;
        if (data.length > 14) {
            counter = data[15].length - 1;
        }
        // Get the dropdown element
        cdp_ids.forEach(id => {
            if (cdpExists == false) {
                cdpExists = true;
            }
            var name = "Receipt " + id;
            var logoUrl = 'images/receipt.png'
            while (data[15][counter].is_burned == true && counter > 0) {
                counter -= 1;
            }
            const resource = acceptedResources.find(ar => ar[1] === data[15][counter].data.programmatic_json.fields[0].value);
            validatorMultiplier = resource[4];
            var cr = ((data[15][counter].data.programmatic_json.fields[3].value / data[15][counter].data.programmatic_json.fields[4].value) * xrdPrice * 100 / internalPrice / validatorMultiplier);
            var status = data[15][counter].data.programmatic_json.fields[6].variant_name;

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
            if (counter > 0) {
                counter -= 1;
            }
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
        update_cdp();
        update_liq();
        update_id();
        update_incentives();
        update_governance();
}

async function getFungibleResources(accountAddress) {
    const response = await fetch('https://mainnet.radixdlt.com/state/entity/details', {
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

// Create a persistent subscription that updates addressSubject
const walletSubscription = rdt.walletApi.walletData$.pipe(
    distinctUntilChanged((prev, curr) => 
        prev?.accounts?.[0]?.address === curr?.accounts?.[0]?.address
    )
).subscribe(walletData => {
    const newAddress = walletData?.accounts?.[0]?.address || DEFAULT_ADDRESS;
    console.log("Wallet changed. New address:", newAddress);
    addressSubject.next(newAddress);
    update(false);  // Trigger an update whenever the wallet changes
});

async function wrappedUseWalletData(address, onlyWallet) {
    if (window.location.pathname === "/deployment") {
        return;
    }
    const updateId = ++latestUpdateId;
    try {
        const data = await fetchData(address);
        
        // Check if this is still the latest update
        if (updateId !== latestUpdateId) {
            console.log(`Update ${updateId} results discarded`);
            return;
        }

        console.log(`Update ${updateId} results applied`);
        if (onlyWallet === false) {
            await useData(data);
        }
        if (window.location.pathname === '/liquidations') {
            setMarkLiqButton();
            setNoMarkLiqButton();
        }
        if (window.location.pathname === '/lbp') {
            createChart(lbpLength, ledgerData);
            resizeChart();
            setLbpSwapButton();
        }
    } catch (error) {
        console.error(`Error in update ${updateId}:`, error);
    }
}

async function update(onlyWallet) {
    const currentAddress = addressSubject.getValue();
    console.log(`Update ${latestUpdateId + 1} - Address to be used:`, currentAddress);
    await wrappedUseWalletData(currentAddress, onlyWallet);
}

// Initial update
update(false);

if (window.location.pathname === '/lbp') {
    window.addEventListener('resize', resizeChart);

    let swapMax = document.getElementById('swap-sell-amount');
    let swapReceive = document.getElementById('amount-receive');
    let inputFieldSwap = document.getElementById('amount-sell');

    inputFieldSwap.oninput = function () {
            calculateLbpChange();
    }

    document.getElementById("switch-button").onclick = function () {
        let source1 = document.getElementById("swap-logo-1").getAttribute("src");
        let source2 = document.getElementById("swap-logo-2").getAttribute("src");
        let sell_suffix = document.getElementById("amount-sell-suffix");
        let receive_suffix = document.getElementById("amount-receive-suffix");
        if (sell_suffix.textContent === "XRD" && receive_suffix.textContent === "ILIS") {
            sell_suffix.textContent = "ILIS";
            receive_suffix.textContent = "XRD";
        } else {
            sell_suffix.textContent = "XRD";
            receive_suffix.textContent = "ILIS";
        }
        document.getElementById("swap-logo-1").setAttribute("src", source2);
        document.getElementById("swap-logo-2").setAttribute("src", source1);
        lbpSell = !lbpSell;
        inputFieldSwap.value = "0";
        swapReceive.value = "0";
        if (lbpSell == true) {
            formattedWallet = Math.floor(walletXrd * 10) / 10;
            swapMax.textContent = "max. " + formattedWallet.toLocaleString('en-US');
        } else {
            if (walletIlis >= 0.1) {
                formattedWallet = Math.floor((walletIlis) * 10) / 10;
            } else {
                formattedWallet = 0;
            }
            swapMax.textContent = "max. " + formattedWallet.toLocaleString('en-US');
        }
        calculateLbpChange();
    }
    swapMax.addEventListener('click', function () {
        if (lbpSell == true) {
            inputFieldSwap.value = walletXrd;
        }
        else {
            inputFieldSwap.value = walletIlis;
        }
        calculateLbpChange();
    });
    swapMax.style.cursor = "pointer";

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

        if (lbpSell == true) {
            sellAddress = xrdAddress;
            message = "Selling XRD for ILIS using the ILIS Balancer-style Liquidity Bootstrapping Pool";
        } else {
            sellAddress = ilisAddress;
            message = "Selling ILIS for XRD using the ILIS Balancer-style Liquidity Bootstrapping Pool";
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
                Address("${lbpComponentAddress}")
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
                update(false);            
            });
    }
}

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
        if (sell) {
            sell = false;
        } else {
            sell = true;
        }
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
            message = "Selling XRD for STAB using the STAB Protocol";
        } else {
            sellAddress = stabAddress;
            message = "Selling STAB for XRD using the STAB Protocol";
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
                message: "Adding liquidity to the STAB Protocol XRD/STAB pool",
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
                message: "Removing liquidity from the STAB Protocol XRD/STAB pool",
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
                Address("${proxyComponentAddress}")
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
      Address("${proxyComponentAddress}")
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
        Address("${proxyComponentAddress}") #pool comp address
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
      Address("${proxyComponentAddress}")
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

                
            });
    }
}

if (window.location.pathname === '/membership') {
    var slider = document.getElementById("slider-stake");
    var inputAmount = document.getElementById("amount-to-stake");
    var maxButton = document.getElementById("max-new-stake");
    var newStake = document.getElementById("new-stake");
    var sliderLock = document.getElementById("slider-lock");
    var inputAmountLock = document.getElementById("days-to-lock");
    var maxButtonLock = document.getElementById("max-new-lock");
    var newLock = document.getElementById("new-lock");

    maxButtonLock.style.cursor = 'pointer';
    maxButton.style.cursor = 'pointer';

    slider.addEventListener('input', function () {
        updateSliderBackground(this);
    });

    sliderLock.addEventListener('input', function () {
        updateSliderBackground(this);
    });

    slider.oninput = function () {
        if (stake) {
            stakingAmount = this.value;
            newStake.textContent = (parseFloat(this.value) + parseFloat(amountStaked) * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 1 });
            inputAmount.value = this.value;
        } else {
            stakingAmount = this.value;
            newStake.textContent = (-this.value + parseFloat(amountStaked) * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 1 });
            inputAmount.value = this.value;
        }
        setStakeButton();
        setLockButton();
        setClaimButton();
        setNewIdButton();
        setUnstakeFinishButton();
    }

    inputAmount.oninput = function () {
        if (stake) {
            var input = this.value === '' ? 0 : parseFloat(this.value);
            if (input > walletIlis) {
                this.value = walletIlis;
                input = walletIlis;
            }
            newStake.textContent = (input + parseFloat(amountStaked) * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 1 });
            slider.value = input;
        } else {
            var input = this.value === '' ? 0 : parseFloat(this.value);
            if (input > parseFloat(amountStaked) * poolMultiplier) {
                this.value = parseFloat(amountStaked) * poolMultiplier;
                input = parseFloat(amountStaked) * poolMultiplier;
            }
            newStake.textContent = (input).toLocaleString('en-US', { maximumFractionDigits: 1 });
            slider.value = input;
        }
        setStakeButton();
        setLockButton();
        setClaimButton();
        setNewIdButton();
        setUnstakeFinishButton();
        updateSliderBackground(slider);
    }

    maxButton.onclick = function () {
        if (!maxButton.disabled) {
            if (stake) {
                slider.value = walletIlis;
                newStake.textContent = (parseFloat(walletIlis) + parseFloat(amountStaked) * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 1 });
                inputAmount.value = walletIlis;
            } else {
                newStake.textContent = "New stake: 0 ILIS";
                slider.value = parseFloat(amountStaked) * poolMultiplier;
                inputAmount.value = slider.value;
            }
        } 
        setStakeButton();
        setLockButton();
        setClaimButton();
        setNewIdButton();
        setUnstakeFinishButton();
        updateSliderBackground(slider);
    }

    sliderLock.oninput = function () {
        if (lock) {
            newLock.textContent = (parseFloat(this.value) + lockNow).toLocaleString('en-US', { maximumFractionDigits: 2 });
            inputAmountLock.value = this.value;
            currentRequiredPayment = getRequiredPayment(ilisLockPayment, 1, this.value, amountStaked * poolMultiplier);
            document.getElementById('ilis-reward').textContent = currentRequiredPayment.toLocaleString('en-US', { maximumFractionDigits: 2 });
        } else {
            newLock.textContent = (Math.max(0, -this.value + lockNow)).toLocaleString('en-US', { maximumFractionDigits: 2 });
            inputAmountLock.value = this.value;
            currentRequiredPayment = getRequiredPayment(ilisLockPayment, ilisUnlockMultiplier, this.value, amountStaked * poolMultiplier);
            document.getElementById('ilis-reward').textContent = currentRequiredPayment.toLocaleString('en-US', { maximumFractionDigits: 2 });
        }
        setStakeButton();
        setLockButton();
        setClaimButton();
        setNewIdButton();
        setUnstakeFinishButton();
    }

    inputAmountLock.oninput = function () {
        if (lock) {
            this.value = Math.min(this.value, maxLockDaysFloor);
            newLock.textContent = (parseFloat(this.value) + lockNow).toLocaleString('en-US', { maximumFractionDigits: 2 });
            sliderLock.value = this.value;
            currentRequiredPayment = getRequiredPayment(ilisLockPayment, 1, sliderLock.value, amountStaked * poolMultiplier);
            document.getElementById('ilis-reward').textContent = currentRequiredPayment.toLocaleString('en-US', { maximumFractionDigits: 2 });
        } else {
            this.value = Math.min(this.value, maxUnlockDaysCeil);
            newLock.textContent = (Math.max(0, -this.value + lockNow)).toLocaleString('en-US', { maximumFractionDigits: 2 });
            sliderLock.value = this.value;
            currentRequiredPayment = getRequiredPayment(ilisLockPayment, ilisUnlockMultiplier, sliderLock.value, amountStaked * poolMultiplier);
            document.getElementById('ilis-reward').textContent = currentRequiredPayment.toLocaleString('en-US', { maximumFractionDigits: 2 });
        }
        setStakeButton();
        setLockButton();
        setClaimButton();
        setNewIdButton();
        setUnstakeFinishButton();
        updateSliderBackground(sliderLock);
    }

    maxButtonLock.onclick = function () {
        if (!maxButtonLock.disabled) {
            if (lock) {
                sliderLock.value = maxLockDaysFloor;
                newLock.textContent = (Math.max(0, maxLockDaysFloor + lockNow)).toLocaleString('en-US', { maximumFractionDigits: 1 });
                inputAmountLock.value = maxLockDaysFloor;
                currentRequiredPayment = getRequiredPayment(ilisLockPayment, 1, sliderLock.value, amountStaked * poolMultiplier);
                document.getElementById('ilis-reward').textContent = currentRequiredPayment.toLocaleString('en-US', { maximumFractionDigits: 2 });
            } else {
                sliderLock.value = maxUnlockDaysCeil;
                newLock.textContent = "New lock: 0 days";
                inputAmountLock.value = maxUnlockDaysCeil;
                currentRequiredPayment = getRequiredPayment(ilisLockPayment, ilisUnlockMultiplier, sliderLock.value, amountStaked * poolMultiplier);
                document.getElementById('ilis-reward').textContent = currentRequiredPayment.toLocaleString('en-US', { maximumFractionDigits: 2 });
            }
        }
        setStakeButton();
        setLockButton();
        setClaimButton();
        setNewIdButton();
        setUnstakeFinishButton();
        updateSliderBackground(sliderLock);
    }

    let buttonsStake = document.querySelectorAll('.stake-button.stake');
    let buttonsLock = document.querySelectorAll('.stake-button.lock');
    // Add an event listener to each button
    buttonsStake.forEach(button => {
        button.addEventListener('click', function () {
            // Perform different actions depending on the id of the clicked button
            buttonsStake.forEach(button => button.classList.remove('selected'));
            this.classList.add('selected');
            if (this.id === 'add-stake-selector') {
                document.getElementById('add-stake-button').style.display = '';
                document.getElementById('remove-stake-button').style.display = 'none';
                document.getElementById('stake-descriptor').textContent = 'amount to stake';
                stake = true;
            } else if (this.id === 'remove-stake-selector') {
                document.getElementById('add-stake-button').style.display = 'none';
                document.getElementById('remove-stake-button').style.display = '';
                document.getElementById('stake-descriptor').textContent = 'amount to unstake';
                stake = false;
            }
            update_id();
        });
    });

    buttonsLock.forEach(button => {
        button.addEventListener('click', function () {
            // Perform different actions depending on the id of the clicked button
            buttonsLock.forEach(button => button.classList.remove('selected'));
            this.classList.add('selected');
            if (this.id === 'add-lock-selector') {
                document.getElementById('remove-lock-button').style.display = 'none';
                document.getElementById('add-lock-button').style.display = '';
                document.getElementById('lock-reward-label').textContent= 'ILIS Reward';
                document.getElementById('lock-descriptor').textContent = 'days to add';
                lock = true;
            } else if (this.id === 'remove-lock-selector') {
                document.getElementById('remove-lock-button').style.display = '';
                document.getElementById('add-lock-button').style.display = 'none';
                document.getElementById('lock-reward-label').textContent= 'Necessary ILIS';
                document.getElementById('lock-descriptor').textContent = 'days to remove';
                lock = false;
            }
            update_id();
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
            if (isConnected) {
                alert('No Membership ID in wallet. Please create one.');
            } else {
                alert('Please connect your wallet.');
            }
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
    Address("${stakingAddress}")
    "create_id";
  
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
                message: "Creating a new ILIS Membership ID",
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

                
            });
    }

    // *********** Stake ***********
    document.getElementById('add-stake-button').onclick = async function () {
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
        var stakeAmount = document.getElementById('amount-to-stake').value;
        console.log(selectedId);

        let manifest = `
        CALL_METHOD
            Address("${accountAddress}")
            "withdraw"
            Address("${ilisAddress}")
            Decimal("${stakeAmount}")
        ;

        TAKE_ALL_FROM_WORKTOP
            Address("${ilisAddress}")
            Bucket("ilis")
        ;

        CALL_METHOD
            Address("${accountAddress}")
            "create_proof_of_non_fungibles"
            Address("${membershipIdAddress}")
            Array<NonFungibleLocalId>(
                NonFungibleLocalId("${selectedId}")
            )
        ;

        POP_FROM_AUTH_ZONE
            Proof("id")
        ;

        CALL_METHOD
            Address("${stakingAddress}")
            "stake"
            Bucket("ilis")
            Enum<1u8>(
                Proof("id")
            )
        ;
      `
        console.log('staking manifest: ', manifest)
        toastMe(0, "Staking request", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Staking ILIS to your ILIS Membership ID",
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
                console.log("Staking Result: ", result.value);
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
            });
    }

    // *********** Unstake ***********
    document.getElementById('remove-stake-button').onclick = async function () {
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
        var stakeAmount = document.getElementById('amount-to-stake').value;
        console.log(selectedId);

        let manifest = `
        CALL_METHOD
            Address("${accountAddress}")
            "create_proof_of_non_fungibles"
            Address("${membershipIdAddress}")
            Array<NonFungibleLocalId>(
                NonFungibleLocalId("${selectedId}")
            )
        ;

        POP_FROM_AUTH_ZONE
            Proof("id")
        ;

        CALL_METHOD
            Address("${stakingAddress}")
            "start_unstake"
            Proof("id")
            Decimal("${stakeAmount/poolMultiplier}")
            false
        ;

        CALL_METHOD
            Address("${accountAddress}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;
      `
        console.log('staking manifest: ', manifest)
        toastMe(0, "Staking request", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Unstaking ILIS from your ILIS Membership ID",
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
                console.log("Unstaking Result: ", result.value);
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
            });
    }

    // *********** Lock ***********
    document.getElementById('add-lock-button').onclick = async function () {
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
        var daysToLock = document.getElementById('days-to-lock').value;
        console.log(selectedId);

        let manifest = `
        CALL_METHOD
            Address("${accountAddress}")
            "create_proof_of_non_fungibles"
            Address("${membershipIdAddress}")
            Array<NonFungibleLocalId>(
                NonFungibleLocalId("${selectedId}")
            )
        ;

        POP_FROM_AUTH_ZONE
            Proof("id")
        ;

        CALL_METHOD
            Address("${stakingAddress}")
            "lock_stake"
            Proof("id")
            ${daysToLock}i64
            true
        ;

        CALL_METHOD
            Address("${accountAddress}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;
      `
        console.log('locking manifest: ', manifest)
        toastMe(0, "Locking request", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Locking ILIS in your ILIS Membership ID",
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Locking", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Unstaking Result: ", result.value);
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
            });
    }

    // *********** Unlock ***********
    document.getElementById('remove-lock-button').onclick = async function () {
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
        var daysToUnlock = document.getElementById('days-to-lock').value;
        console.log(selectedId);

        let manifest = `
        CALL_METHOD
            Address("${accountAddress}")
            "withdraw"
            Address("${ilisAddress}")
            Decimal("${(parseFloat(currentRequiredPayment) + 0.1)}")
        ;

        TAKE_ALL_FROM_WORKTOP
            Address("${ilisAddress}")
            Bucket("ilis")
        ;

        CALL_METHOD
            Address("${accountAddress}")
            "create_proof_of_non_fungibles"
            Address("${membershipIdAddress}")
            Array<NonFungibleLocalId>(
                NonFungibleLocalId("${selectedId}")
            )
        ;

        POP_FROM_AUTH_ZONE
            Proof("id")
        ;

        CALL_METHOD
            Address("${stakingAddress}")
            "unlock_stake"
            Proof("id")
            Bucket("ilis")
            ${daysToUnlock}i64
        ;

        CALL_METHOD
            Address("${accountAddress}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;
      `
        console.log('unlocking manifest: ', manifest)
        toastMe(0, "Unlocking request", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Unlocking ILIS in your ILIS Membership ID",
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Unlocking", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Unstaking Result: ", result.value);
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
            });
    }
    // *********** Finish unstake ***********
    document.getElementById('claim-unstaked-button').onclick = async function () {
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
        
        // Take only the first 5 IDs from idsReadyToUnstake
        const limitedIds = idsReadyToUnstake.slice(0, 5);

        const nonFungibleIdsString = limitedIds
            .map(id => `NonFungibleLocalId("${id}")`)
            .join(',\n            ');

        let manifest_first = `
        CALL_METHOD
        Address("${accountAddress}")
        "withdraw_non_fungibles"
        Address("${membershipUnstakeAddress}")
        Array<NonFungibleLocalId>(
            ${nonFungibleIdsString}
        )
        ;`

        let manifest_second = limitedIds.map((id, index) => `
        TAKE_NON_FUNGIBLES_FROM_WORKTOP
        Address("${membershipUnstakeAddress}")
        Array<NonFungibleLocalId>(
            NonFungibleLocalId("${id}")
        )
        Bucket("unstake_nft_${index}")
        ;

        CALL_METHOD
        Address("${stakingAddress}")
        "finish_unstake"
        Bucket("unstake_nft_${index}")
        ;
        `).join('\n');

        let manifest_third = `
        CALL_METHOD
        Address("${accountAddress}")
        "deposit_batch"
        Expression("ENTIRE_WORKTOP")
        ;
        `

        let manifest = manifest_first + manifest_second + manifest_third;
        console.log('unstaking manifest: ', manifest)
        toastMe(0, "Finishing unstake", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: "Finishing ILIS unstake",
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Finishing unstake", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Unstaking Result: ", result.value);
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
            });
    }
}

if (window.location.pathname === '/governance') {

    var proposalCounter = document.getElementById('prop-id-counter');
    var plusSymbolProp = document.getElementById('plus-symbol-prop');
    var minusSymbolProp = document.getElementById('minus-symbol-prop');

    plusSymbolProp.onclick = function () {
        if (parseInt(proposalCounter.textContent) < maxProposals) {
            var nextProposal = parseInt(proposalCounter.textContent) + 1;
            if (proposalToView == -1) {
                nextProposal = 2;
            }
            proposalCounter.textContent = nextProposal;
            minusSymbolProp.disabled = false;
            minusSymbolProp.style.backgroundColor = "";
        } else {
            plusSymbolProp.disabled = true;
        }
        proposalToView = parseInt(proposalCounter.textContent);
        update_governance();
    }
    minusSymbolProp.onclick = function () {
        var nextProposal = parseInt(proposalCounter.textContent);
        if (parseInt(proposalCounter.textContent) > -1) {
            nextProposal -= 1;
            if (proposalToView == 2) {
                proposalCounter.textContent = -1
                nextProposal = -1;
            } else {
                proposalCounter.textContent = parseInt(proposalCounter.textContent) - 1;
            }   
            plusSymbolProp.disabled = false;
        }
        if (parseInt(proposalCounter.textContent) == -1) {
            minusSymbolProp.disabled = true;
        }
        proposalToView = nextProposal;
        update_governance();
    }

    let buttonsVote = document.querySelectorAll('.stake-button.vote');
    // Add an event listener to each button
    buttonsVote.forEach(button => {
        button.addEventListener('click', function () {
            // Perform different actions depending on the id of the clicked button
            buttonsVote.forEach(button => button.classList.remove('selected'));
            this.classList.add('selected');
            if (this.id === 'vote-for') {
                vote = true;
            } else if (this.id === 'vote-against') {
                vote = false;
            }
            update_governance();
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
            if (isConnected) {
                alert('No Membership ID in wallet. Please create one.');
            } else {
                alert('Please connect your wallet.');
            }
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
    // *********** Vote ***********
    document.getElementById('vote-button').onclick = async function () {
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
            Address("${accountAddress}")
            "create_proof_of_non_fungibles"
            Address("${membershipIdAddress}")
            Array<NonFungibleLocalId>(
                NonFungibleLocalId("${selectedId}")
            )
        ;

        POP_FROM_AUTH_ZONE
            Proof("id")
        ;

        CALL_METHOD
            Address("${governanceAddress}")
            "vote_on_proposal"
            ${proposalToView}u64
            ${vote}
            Proof("id")
        ;
      `
        console.log('voting manifest: ', manifest)
        toastMe(0, "Voting on proposal", 1);

        var voteDescription = "for";

        if (vote == false) {
            voteDescription = "against";
        }

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: `Voting ${voteDescription} proposal ${proposalToView}`,
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Voting", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Voting Result: ", result.value);
                update_governance();
            })
            .catch(error => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';                
            });
    }
}

if (window.location.pathname === '/incentives') {
    var slider = document.getElementById("slider-stake");
    var inputAmount = document.getElementById("amount-to-stake");
    var maxButton = document.getElementById("max-new-stake");
    var newStake = document.getElementById("new-stake");
    var newReward = document.getElementById("staking-rewards");
    var sliderLock = document.getElementById("slider-lock");
    var inputAmountLock = document.getElementById("days-to-lock");
    var maxButtonLock = document.getElementById("max-new-lock");
    var newLock = document.getElementById("new-lock");

    console.log(xrdLbpPoolAmount);
    console.log(ilisWeight);
    console.log(ilisLbpPoolAmount);
    console.log(xrdWeight);
    console.log(xrdLbpPrice);

    maxButtonLock.style.cursor = 'pointer';
    maxButton.style.cursor = 'pointer';

    slider.addEventListener('input', function () {
        updateSliderBackground(this);
    });

    sliderLock.addEventListener('input', function () {
        updateSliderBackground(this);
    });

    slider.oninput = function () {
        getWeights();
        var ilisPrice = ((parseFloat(xrdLbpPoolAmount) * parseFloat(ilisWeight)) / (parseFloat(ilisLbpPoolAmount) * parseFloat(xrdWeight))) * parseFloat(xrdLbpPrice);
        if (stake) {
            stakingAmount = this.value;
            newStake.textContent = (parseFloat(this.value) + parseFloat(amountStaked) * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 1 }) + " LPSTAB";
            inputAmount.value = this.value;
            var reward = parseFloat(currentLpReward) * (parseFloat(amountStaked) + parseFloat(stakingAmount)) / (parseFloat(currentLpStaked) + parseFloat(stakingAmount));
            var rewardValue = parseFloat(reward) * parseFloat(ilisPrice);
            console.log((parseFloat(currentLpStaked) + parseFloat(stakingAmount)));
            newReward.textContent = (reward).toLocaleString('en-US', { maximumFractionDigits: 1 }) + " ILIS (" + (100 * 52 * rewardValue / (parseFloat(lpStabValue) * (parseFloat(amountStaked) + parseFloat(stakingAmount)))).toFixed(1) + "% APY)";
        } else {
            stakingAmount = this.value;
            newStake.textContent = (-this.value + parseFloat(amountStaked) * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 1 }) + " LPSTAB";
            inputAmount.value = this.value;
            var reward = parseFloat(currentLpReward) * (parseFloat(amountStaked) - parseFloat(stakingAmount)) / (parseFloat(currentLpStaked) - parseFloat(stakingAmount));
            var rewardValue = parseFloat(reward) * parseFloat(ilisPrice);
            newReward.textContent = (reward).toLocaleString('en-US', { maximumFractionDigits: 1 }) + " ILIS (" + (100 * 52 * rewardValue / (parseFloat(lpStabValue) * (parseFloat(amountStaked) - parseFloat(stakingAmount)))).toFixed(1) + "% APY)";
        }
        setStakeButton();
        setLockButton();
        setClaimButton();
        setNewIdButton();
        setUnstakeFinishButton();
    }

    inputAmount.oninput = function () {
        getWeights();
        var ilisPrice = ((parseFloat(xrdLbpPoolAmount) * parseFloat(ilisWeight)) / (parseFloat(ilisLbpPoolAmount) * parseFloat(xrdWeight))) * parseFloat(xrdLbpPrice);
        if (stake) {
            var input = this.value === '' ? 0 : parseFloat(this.value);
            if (input > walletResource) {
                input = walletResource;
                this.value = input;
            }     
            newStake.textContent = (input + parseFloat(amountStaked) * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 1 }) + " LPSTAB";
            slider.value = input;
            var reward = parseFloat(currentLpReward) * (parseFloat(amountStaked) + parseFloat(input)) / (parseFloat(currentLpStaked) + parseFloat(input));
            var rewardValue = parseFloat(reward) * parseFloat(ilisPrice);
            newReward.textContent = (reward).toLocaleString('en-US', { maximumFractionDigits: 1 }) + " ILIS (" + (100 * 52 * rewardValue / (parseFloat(lpStabValue) * (parseFloat(amountStaked) + parseFloat(input)))).toFixed(1) + "% APY)";
        } else {
            var input = this.value === '' ? 0 : parseFloat(this.value);
            if (input > parseFloat(amountStaked) * poolMultiplier) {
                input = parseFloat(amountStaked) * poolMultiplier;
                this.value = input;
            }
            newStake.textContent = (input).toLocaleString('en-US', { maximumFractionDigits: 1 }) + " LPSTAB";
            slider.value = input;
            var reward = parseFloat(currentLpReward) * (parseFloat(amountStaked) - parseFloat(input)) / (parseFloat(currentLpStaked) - parseFloat(input));
            var rewardValue = parseFloat(reward) * parseFloat(ilisPrice);
            newReward.textContent = (reward).toLocaleString('en-US', { maximumFractionDigits: 1 }) + " ILIS (" + (100 * 52 * rewardValue / (parseFloat(lpStabValue) * (parseFloat(amountStaked) - parseFloat(input)))).toFixed(1) + "% APY)";
        }
        setStakeButton();
        setLockButton();
        setClaimButton();
        setNewIdButton();
        setUnstakeFinishButton();
        updateSliderBackground(slider);
    }

    maxButton.onclick = function () {
        getWeights();
        var ilisPrice = ((parseFloat(xrdLbpPoolAmount) * parseFloat(ilisWeight)) / (parseFloat(ilisLbpPoolAmount) * parseFloat(xrdWeight))) * parseFloat(xrdLbpPrice);
        if (!maxButton.disabled) {
            if (stake) {
                slider.value = walletResource;
                newStake.textContent = (parseFloat(walletResource) + parseFloat(amountStaked) * poolMultiplier).toLocaleString('en-US', { maximumFractionDigits: 1 });
                inputAmount.value = walletResource;
                var reward = parseFloat(currentLpReward) * (parseFloat(amountStaked) + parseFloat(walletResource)) / (parseFloat(currentLpStaked) + parseFloat(walletResource));
                var rewardValue = parseFloat(reward) * parseFloat(ilisPrice);
                newReward.textContent = (reward).toLocaleString('en-US', { maximumFractionDigits: 1 }) + " ILIS (" + (100 * 52 * rewardValue / (parseFloat(lpStabValue) * (parseFloat(amountStaked) + parseFloat(walletResource)))).toFixed(1) + "% APY)";
            } else {
                newStake.textContent = "New stake: 0 ILIS";
                slider.value = parseFloat(amountStaked) * poolMultiplier;
                inputAmount.value = slider.value;
                var reward = 0;
                var rewardValue = parseFloat(reward) * parseFloat(ilisPrice);
                newReward.textContent = "0 ILIS";
            }
        } 
        setStakeButton();
        setLockButton();
        setClaimButton();
        setNewIdButton();
        setUnstakeFinishButton();
        updateSliderBackground(slider);
    }

    sliderLock.oninput = function () {
        if (lock) {
            newLock.textContent = (parseFloat(this.value) + lockNow).toLocaleString('en-US', { maximumFractionDigits: 2 });
            inputAmountLock.value = this.value;
            currentRequiredPayment = getRequiredPayment(ilisLockPayment, 1, this.value, amountStaked * poolMultiplier);
            document.getElementById('ilis-reward').textContent = currentRequiredPayment.toLocaleString('en-US', { maximumFractionDigits: 2 });
        } else {
            newLock.textContent = (Math.max(0, -this.value + lockNow)).toLocaleString('en-US', { maximumFractionDigits: 2 });
            inputAmountLock.value = this.value;
            currentRequiredPayment = getRequiredPayment(lbpLockPayment, lbpUnlockMultiplier, this.value, amountStaked * poolMultiplier);
            document.getElementById('ilis-reward').textContent = currentRequiredPayment.toLocaleString('en-US', { maximumFractionDigits: 2 });
        }
        setStakeButton();
        setLockButton();
        setClaimButton();
        setNewIdButton();
        setUnstakeFinishButton();
    }

    inputAmountLock.oninput = function () {
        if (lock) {
            this.value = Math.min(this.value, maxLockDaysFloor);
            newLock.textContent = (parseFloat(this.value) + lockNow).toLocaleString('en-US', { maximumFractionDigits: 2 });
            sliderLock.value = this.value;
            currentRequiredPayment = getRequiredPayment(ilisLockPayment, 1, sliderLock.value, amountStaked * poolMultiplier);
            document.getElementById('ilis-reward').textContent = currentRequiredPayment.toLocaleString('en-US', { maximumFractionDigits: 2 });
        } else {
            this.value = Math.min(this.value, maxUnlockDaysCeil);
            newLock.textContent = (Math.max(0, -this.value + lockNow)).toLocaleString('en-US', { maximumFractionDigits: 2 });
            sliderLock.value = this.value;
            currentRequiredPayment = getRequiredPayment(lbpLockPayment, lbpUnlockMultiplier, sliderLock.value, amountStaked * poolMultiplier);
            document.getElementById('ilis-reward').textContent = currentRequiredPayment.toLocaleString('en-US', { maximumFractionDigits: 2 });
        }
        setStakeButton();
        setLockButton();
        setClaimButton();
        setNewIdButton();
        setUnstakeFinishButton();
        updateSliderBackground(sliderLock);
    }

    maxButtonLock.onclick = function () {
        if (!maxButtonLock.disabled) {
            if (lock) {
                sliderLock.value = maxLockDaysFloor;
                newLock.textContent = (Math.max(0, maxLockDaysFloor + lockNow)).toLocaleString('en-US', { maximumFractionDigits: 1 });
                inputAmountLock.value = maxLockDaysFloor;
                currentRequiredPayment = getRequiredPayment(ilisLockPayment, 1, sliderLock.value, amountStaked * poolMultiplier);
                document.getElementById('ilis-reward').textContent = currentRequiredPayment.toLocaleString('en-US', { maximumFractionDigits: 2 });
            } else {
                sliderLock.value = maxUnlockDaysCeil;
                newLock.textContent = "New lock: 0 days";
                inputAmountLock.value = maxUnlockDaysCeil;
                currentRequiredPayment = getRequiredPayment(lbpLockPayment, lbpUnlockMultiplier, sliderLock.value, amountStaked * poolMultiplier);
                document.getElementById('ilis-reward').textContent = currentRequiredPayment.toLocaleString('en-US', { maximumFractionDigits: 2 });
            }
        }
        setStakeButton();
        setLockButton();
        setClaimButton();
        setNewIdButton();
        setUnstakeFinishButton();
        updateSliderBackground(sliderLock);
    }

    let buttonsStake = document.querySelectorAll('.stake-button.stake');
    let buttonsLock = document.querySelectorAll('.stake-button.lock');
    // Add an event listener to each button
    buttonsStake.forEach(button => {
        button.addEventListener('click', function () {
            // Perform different actions depending on the id of the clicked button
            buttonsStake.forEach(button => button.classList.remove('selected'));
            this.classList.add('selected');
            if (this.id === 'add-stake-selector') {
                document.getElementById('add-stake-button').style.display = '';
                document.getElementById('remove-stake-button').style.display = 'none';
                document.getElementById('stake-descriptor').textContent = 'amount to stake';
                stake = true;
            } else if (this.id === 'remove-stake-selector') {
                document.getElementById('add-stake-button').style.display = 'none';
                document.getElementById('remove-stake-button').style.display = '';
                document.getElementById('stake-descriptor').textContent = 'amount to unstake';
                stake = false;
            }
            update_incentives();
        });
    });

    buttonsLock.forEach(button => {
        button.addEventListener('click', function () {
            // Perform different actions depending on the id of the clicked button
            buttonsLock.forEach(button => button.classList.remove('selected'));
            this.classList.add('selected');
            if (this.id === 'add-lock-selector') {
                document.getElementById('remove-lock-button').style.display = 'none';
                document.getElementById('add-lock-button').style.display = '';
                document.getElementById('lock-reward-label').textContent= 'ILIS Reward';
                document.getElementById('lock-descriptor').textContent = 'days to add';
                lock = true;
            } else if (this.id === 'remove-lock-selector') {
                document.getElementById('remove-lock-button').style.display = '';
                document.getElementById('add-lock-button').style.display = 'none';
                document.getElementById('lock-reward-label').textContent= 'Necessary ILIS';
                document.getElementById('lock-descriptor').textContent = 'days to remove';
                lock = false;
            }
            update_incentives();
        });
    });
    // Get the dropdown button and content
    var dropdownButton = document.querySelector('.dropdown-custom-button.id');
    var dropdownContent = document.querySelector('.dropdown-custom-content.id');

    // Add click event listeners to each option
    var options = document.querySelectorAll('.dropdown-custom-option.id');

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
        var options = document.querySelectorAll('.dropdown-custom-option.id');

        // Check if there are any options
        if (options.length === 0) {
            // If not, display a message
            if (isConnected) {
                alert('No Incentives ID in wallet. Please create one.');
            } else {
                alert('Please connect your wallet.');
            }
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

    // Get the dropdown button and content
    var dropdownButton2 = document.querySelector('.dropdown-custom-button.resource');
    var dropdownContent2 = document.querySelector('.dropdown-custom-content.resource');

    // Add click event listeners to each option
    var options2 = document.querySelectorAll('.dropdown-custom-option.resource');

    // Show the dropdown content when the button is clicked
    dropdownButton2.addEventListener('click', function () {
        if (dropdownButton2.disabled) {
            return;
        }
        if (dropdownContent2 !== undefined) {
            var display = dropdownContent2.style.display;
            dropdownContent2.style.display = display === 'block' ? 'none' : 'block';
            setChevron(dropdownContent2);
        }
        var options2 = document.querySelectorAll('.dropdown-custom-option.resource');

        // Check if there are any options
        if (options2.length === 0) {
            // If not, display a message
            if (isConnected) {
                alert('No Incentives ID in wallet. Please create one.');
            } else {
                alert('Please connect your wallet.');
            }
        }
    });

    document.addEventListener('click', function (event) {
        // Check if the clicked element is the dropdown button or one of the dropdown options
        var isDropdownButton = dropdownButton2.contains(event.target);
        var isDropdownOption = Array.from(options2).some(function (option) {
            return option.contains(event.target);
        });

        // If the clicked element is not the dropdown button or one of the dropdown options, hide the dropdown content
        if (!isDropdownButton && !isDropdownOption) {
            dropdownContent2.style.display = 'none';
            setChevron(dropdownContent2);
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
    Address("${incentiveAddress}")
    "create_id";
  
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
                message: "Creating a new ILIS Incentive ID",
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

                
            });
    }

    // *********** Stake ***********
    document.getElementById('add-stake-button').onclick = async function () {
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
        var stakeAmount = document.getElementById('amount-to-stake').value;
        console.log(selectedId);

        let manifest = `
        CALL_METHOD
            Address("${accountAddress}")
            "withdraw"
            Address("${selectedResource}")
            Decimal("${stakeAmount}")
        ;

        TAKE_ALL_FROM_WORKTOP
            Address("${selectedResource}")
            Bucket("stake")
        ;

        CALL_METHOD
            Address("${accountAddress}")
            "create_proof_of_non_fungibles"
            Address("${incentiveIdAddress}")
            Array<NonFungibleLocalId>(
                NonFungibleLocalId("${selectedId}")
            )
        ;

        POP_FROM_AUTH_ZONE
            Proof("id")
        ;

        CALL_METHOD
            Address("${incentiveAddress}")
            "stake"
            Bucket("stake")
            Enum<1u8>(
                Proof("id")
            )
        ;

        CALL_METHOD
            Address("${accountAddress}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;
      `
        console.log('staking manifest: ', manifest)
        toastMe(0, "Staking request", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: `Staking ${selectedResource} to your ILIS Incentives ID`,
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
                console.log("Staking Result: ", result.value);
                update(false);
                update_incentives();
            })
            .catch(error => {
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
            });
    }

    // *********** Unstake ***********
    document.getElementById('remove-stake-button').onclick = async function () {
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
        var stakeAmount = document.getElementById('amount-to-stake').value;
        console.log(selectedId);

        let manifest = `
        CALL_METHOD
            Address("${accountAddress}")
            "create_proof_of_non_fungibles"
            Address("${incentiveIdAddress}")
            Array<NonFungibleLocalId>(
                NonFungibleLocalId("${selectedId}")
            )
        ;

        POP_FROM_AUTH_ZONE
            Proof("id")
        ;

        CALL_METHOD
            Address("${incentiveAddress}")
            "start_unstake"
            Proof("id")
            Address("${selectedResource}")
            Decimal("${stakeAmount}")
            false
        ;

        CALL_METHOD
            Address("${accountAddress}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;
      `
        console.log('staking manifest: ', manifest)
        toastMe(0, "Staking request", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: `Unstaking ${selectedResource} from your ILIS Incentives ID`,
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
                console.log("Unstaking Result: ", result.value);
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
            });
    }

    // *********** Lock ***********
    document.getElementById('add-lock-button').onclick = async function () {
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
        var daysToLock = document.getElementById('days-to-lock').value;
        console.log(selectedId);

        let manifest = `
        CALL_METHOD
            Address("${accountAddress}")
            "create_proof_of_non_fungibles"
            Address("${incentiveIdAddress}")
            Array<NonFungibleLocalId>(
                NonFungibleLocalId("${selectedId}")
            )
        ;

        POP_FROM_AUTH_ZONE
            Proof("id")
        ;

        CALL_METHOD
            Address("${incentiveAddress}")
            "lock_stake"
            Address("${selectedResource}")
            Proof("id")
            ${daysToLock}i64
        ;

        CALL_METHOD
            Address("${accountAddress}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;
      `
        console.log('locking manifest: ', manifest)
        toastMe(0, "Locking request", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: `Locking ${selectedResource} in your ILIS Incentives ID`,
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Locking", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Unstaking Result: ", result.value);
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
            });
    }

    // *********** Unlock ***********
    document.getElementById('remove-lock-button').onclick = async function () {
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
        var daysToUnlock = document.getElementById('days-to-lock').value;
        console.log(selectedId);

        let manifest = `
        CALL_METHOD
            Address("${accountAddress}")
            "withdraw"
            Address("${ilisAddress}")
            Decimal("${(parseFloat(currentRequiredPayment) + 0.001)}")
        ;

        TAKE_ALL_FROM_WORKTOP
            Address("${ilisAddress}")
            Bucket("ilis")
        ;

        CALL_METHOD
            Address("${accountAddress}")
            "create_proof_of_non_fungibles"
            Address("${incentiveIdAddress}")
            Array<NonFungibleLocalId>(
                NonFungibleLocalId("${selectedId}")
            )
        ;

        POP_FROM_AUTH_ZONE
            Proof("id")
        ;

        CALL_METHOD
            Address("${incentiveAddress}")
            "unlock_stake"
            Address("${selectedResource}")
            Proof("id")
            Bucket("ilis")
            ${daysToUnlock}i64
        ;

        CALL_METHOD
            Address("${accountAddress}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;
      `
        console.log('unlocking manifest: ', manifest)
        toastMe(0, "Unlocking request", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: `Unlocking ${selectedResource} in your ILIS Incentives ID`,
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Unlocking", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Unstaking Result: ", result.value);
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
            });
    }

    // *********** Claim periods ***********
    document.getElementById('claim-periods-button').onclick = async function () {
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
        var daysToUnlock = document.getElementById('days-to-lock').value;
        console.log(selectedId);

        let manifest = `
        CALL_METHOD
            Address("${accountAddress}")
            "create_proof_of_non_fungibles"
            Address("${incentiveIdAddress}")
            Array<NonFungibleLocalId>(
                NonFungibleLocalId("${selectedId}")
            )
        ;

        POP_FROM_AUTH_ZONE
            Proof("id")
        ;

        CALL_METHOD
            Address("${incentiveAddress}")
            "update_id"
            Proof("id")
        ;

        CALL_METHOD
            Address("${accountAddress}")
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;
      `
        console.log('claiming manifest: ', manifest)
        toastMe(0, "Claiming request", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: `Claiming rewards from your ILIS Incentives ID`,
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Claiming", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Claiming Result: ", result.value);
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
            });
    }

    // *********** Finish unstake ***********
    document.getElementById('claim-unstaked-button').onclick = async function () {
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
        
        // Take only the first 5 IDs from idsReadyToUnstake
        const limitedIds = idsReadyToUnstake.slice(0, 5);

        const nonFungibleIdsString = limitedIds
            .map(id => `NonFungibleLocalId("${id}")`)
            .join(',\n            ');

        let manifest_first = `
        CALL_METHOD
        Address("${accountAddress}")
        "withdraw_non_fungibles"
        Address("${incentiveUnstakeAddress}")
        Array<NonFungibleLocalId>(
            ${nonFungibleIdsString}
        )
        ;`

        let manifest_second = limitedIds.map((id, index) => `
        TAKE_NON_FUNGIBLES_FROM_WORKTOP
        Address("${incentiveUnstakeAddress}")
        Array<NonFungibleLocalId>(
            NonFungibleLocalId("${id}")
        )
        Bucket("unstake_nft_${index}")
        ;

        CALL_METHOD
        Address("${incentiveAddress}")
        "finish_unstake"
        Bucket("unstake_nft_${index}")
        ;
        `).join('\n');

        let manifest_third = `
        CALL_METHOD
        Address("${accountAddress}")
        "deposit_batch"
        Expression("ENTIRE_WORKTOP")
        ;
        `

        let manifest = manifest_first + manifest_second + manifest_third;
        console.log('unstaking manifest: ', manifest)
        toastMe(0, "Finishing unstake", 1);

        // Send manifest to extension for signing
        rdt.walletApi
            .sendTransaction({
                transactionManifest: manifest,
                version: 1,
                message: `Finishing ${selectedResource} unstake`,
            })
            .then(result => {
                toastMe(result.value.transactionIntentHash, "Finishing unstake", 2);
                // Hide the spinner, show the angle icon, and change the button text back
                spinner.style.display = 'none';
                angleIcon.style.display = 'inline-block';
                buttonText.style.display = 'inline-block';
                buttonWaiting.style.display = 'none';
                button.disabled = false;
                button.style.backgroundColor = '';
                console.log("Unstaking Result: ", result.value);
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
            });
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
            if (parseFloat(this.value) > availableCollateral) {
                this.value = availableCollateral;
            }
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
            if (newCr < 150) {
                inputAmount.value = (collateralAmount - getNecessaryCollateral(debtAmount, 1.5, validatorMultiplier));
                newCr = 150;
            }
            realInputCol = newCr;
            document.getElementById("new-cr").textContent = "New CR: " + (newCr).toFixed(2) + "%";
            if (this.value != "") {
                slider.value = maxCr - newCr;
            } else {
                slider.value = slider.min;
                document.getElementById("new-cr").textContent = "New CR: " + maxCr + "%";
            }
            console.log(realInputCol);
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
            if (newCrDebt < 150) {
                newCrDebt = 150;
                inputAmountDebt.value = (getNecessaryStab(collateralAmount, 1.5, validatorMultiplier) - debtAmount);
            }
            realInputDebt = newCrDebt;
            console.log(newCrDebt);
            document.getElementById("new-cr-debt").textContent = "New CR: " + (newCrDebt).toFixed(2) + "%";
            if (this.value != "") {
                sliderDebt.value = maxCrDebt - newCrDebt;
                //newCrDebt = sliderDebt.value;
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
          Address("${proxyComponentAddress}")
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
          Address("${proxyComponentAddress}")
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
          Address("${proxyComponentAddress}")
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
          Address("${proxyComponentAddress}")
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
                    Address("${proxyComponentAddress}") #pool comp address
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
              Address("${proxyComponentAddress}")
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
              Address("${proxyComponentAddress}")
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
    Address("${proxyComponentAddress}")
    "open_cdp"
    Bucket("collateral")
    Decimal("${mintAmount}");
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
            });
    }
}

function createChart(lbpLength, initialDataWithoutNow) {
    // Example Data: [time, [XRD amount, ILIS amount]]
    //const lbpLength = 7;

    const initialData = initialDataWithoutNow.concat([[lbpProgress, initialDataWithoutNow[initialDataWithoutNow.length - 1][1]]]);
    const dataExtrapolated = [
        [1, initialData[initialData.length - 1][1]],
    ];
    const cutoffPoint = (initialData[initialData.length - 1][0]) * lbpLength;
    const data = initialData.concat(dataExtrapolated);

    console.log(data);

    const dataWithoutLastTwoElements = data.slice(0, -2);
    let tableArray = [];

    for (let i = 1; i < dataWithoutLastTwoElements.length; i++) {
        var time = (lbpDuration / 60) * (lbpProgress - dataWithoutLastTwoElements[i][0]);
        var timeValue = `${Math.ceil(time)}m ago`
        if (time > 60) {
            var minutes = time % 60;
            timeValue = `${Math.floor(time / 60)}h ${minutes.toFixed(0)}m ago`
        }
        var xrdDifference = dataWithoutLastTwoElements[i][1][0] - dataWithoutLastTwoElements[i-1][1][0];
        var ilisDifference = dataWithoutLastTwoElements[i][1][1] - dataWithoutLastTwoElements[i-1][1][1];
        var type = "buy";
        if (ilisDifference > 0) {
            type = "sell"
        }
        var absIlis = Math.abs(ilisDifference).toFixed(2) + " ILIS";
        var buyValue = Math.abs(xrdDifference).toFixed(2) + " XRD = $" + Math.abs(xrdDifference * xrdPrice).toFixed(2);
        tableArray.push([timeValue, type, absIlis, buyValue])
    }


    const tableBody = document.getElementById('table-body');
    
    // Function to generate table rows from the array in reverse order
    function generateTableRowsInReverse(data) {
        for (let i = data.length - 1; i >= 0; i--) {
            const item = data[i]; // Get the current sub-array
            const row = document.createElement('tr'); // Create a new row
            item.forEach(cellData => {
                const cell = document.createElement('td'); // Create a new cell
                cell.textContent = cellData; // Set the cell's text
                if (cellData == "sell") {
                    cell.style.color = "red";
                }
                if (cellData == "buy") {
                    cell.style.color = "green";
                }
                row.appendChild(cell); // Append the cell to the row
            });
            tableBody.appendChild(row); // Append the row to the table body
        }
    }

    generateTableRowsInReverse(tableArray);

    if (lbpEnded == true) {
        xrdLbpPoolAmount = data[data.length - 1][1][0];
        ilisLbpPoolAmount = data[data.length - 1][1][1];
        document.getElementById('final-fdv').textContent = "$"+(((xrdLbpPoolAmount * 0.5) / (ilisLbpPoolAmount * 0.5)) * 100000000 * xrdLbpPrice).toLocaleString('en-US', { maximumFractionDigits: 0 });
        document.getElementById('ilis-price-final').textContent = "$"+(((xrdLbpPoolAmount * 0.5) / (ilisLbpPoolAmount * 0.5)) * xrdLbpPrice).toLocaleString('en-US', { maximumFractionDigits: 4 }) + " XRD";
        document.getElementById('lbp-end-text').textContent = "Thanks for participating in the ILIS LBP! The LBP has ended and the price progression can be seen in the chart below. The resulting liquidity has been added to the Ociswap ILIS/XRD pool, go there or to any other DEX to swap ILIS.";
    }

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

    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
        // Destroy the existing chart
        existingChart.destroy();
    }

    realChart = new Chart(ctx, {
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
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'linear',  // Use linear scale for the x-axis
                    title: {
                        display: true,
                        text: 'Time (days from start)',
                        color: 'white'  // Change x-axis title color to white
                    },
                    min: 0, // Minimum value for x-axis
                    max: lbpLength, // Maximum value for x-axis
                    ticks: {
                        color: 'white',  // Change x-axis ticks color to white
                        callback: function(value) {
                            // Format the value to remove unnecessary decimal places
                            return Number.isInteger(value) ? value : parseFloat(value).toFixed(0);
                        }
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