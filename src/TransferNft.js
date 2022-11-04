

const web3 = require('@solana/web3.js');
const splToken = require('@solana/spl-token');

 async function Main() {

  //Create connection to mainnet
  const connection = new web3.Connection(web3.clusterApiUrl('devnet'));

  //Generate secretKey from Uint8Array(Make sure it's right format! i.e. [123,123,123...])
  let secretKey = Uint8Array.from([
    242,  69, 215,   4,  59,  82, 189, 115,  95, 218,  58,
    246,  49, 213, 208, 108, 126, 104, 138, 120,  25, 218,
     64, 185,  76,  59, 180, 120, 163,  79, 221, 188, 251,
     95, 167, 186,  94, 229,  96,  19,  37,  41, 103,  27,
    213,  35,   1,  92, 250, 153, 234, 202, 199, 245, 235,
    202, 111,  64,  49,  86,  77, 120, 228, 114]);

    //const secretKey = web3.provider.fromSecretKey(secretKey);
  

  const tokenMintAddress = new web3.PublicKey(['BP3JVd6SxyHva66tjJagvHhk73WwxXGRVe8eAqvB6tUG'] , ['DbtFKGo2LUJc72dnAFVrjMuxPL5d4SZQyWSdwyaMRrxP'] , ['5z7QBek9MWbryXcQD1GEsu4TcEz5Trph8CDdHS9CUhTz']);
  const nftReciver = new web3.PublicKey('CGQz9fqdx98MyaV72GBhTQdy8mXX42vp8Mk4E4j86wSf');

  let my_token_account = await splToken.getOrCreateAssociatedTokenAccount(
    connection,
    payer = secretKey,
    mint = tokenMintAddress,
    owner = secretKey.publicKey,
    commitment = 'finalized',
    allowOwnerOffCurve = false,
    confirmOptions = null,
    programId = splToken.TOKEN_PROGRAM_ID,
    associatedTokenProgramId = splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
  )
  let reciver_token_account = await splToken.getOrCreateAssociatedTokenAccount(
    connection,
    payer = secretKey,
    mint = tokenMintAddress,
    owner = nftReciver,
    commitment = 'finalized',
    allowOwnerOffCurve = false,
    confirmOptions = null,
    programId = splToken.TOKEN_PROGRAM_ID,
    associatedTokenProgramId = splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
  );

  console.log('My token account public address: ' + my_token_account.address.toBase58());
  console.log('Reciver token account public address: ' + reciver_token_account.address.toBase58());
  try {
    await transfer_tokens(
      wallet = secretKey,
      connection,
      amount = 1,
      reciver_token_account = reciver_token_account,
      from_token_account = my_token_account,
    )
  } catch (error) {
    console.log(error)
  }

  console.log('Done!');


async function transfer_tokens(wallet, connection, amount, reciver_token_account, from_token_account) {
  //if trx takes more when 60 sec to complete you will receive error here
  const transfer_trx = await splToken.transfer(
    connection,
    payer = wallet,
    source = from_token_account.address,
    destination = reciver_token_account.address,
    owner = wallet,
    amount = amount,
    multiSigners = [wallet],
    confirmOptions = false,
    programId = splToken.TOKEN_PROGRAM_ID,
  )

  console.log(transfer_trx)

  console.log("Transcation signature", transfer_trx);
  console.log("Success!");
  



    return (
        <>
        <div>
            Transfer Multiple Nft Section
            <div>
                <button onClick={transfer_tokens}>Transfer NFT</button>
              
            </div>
        </div>
        </>
)}};

export default Main;
