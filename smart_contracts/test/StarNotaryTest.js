const StarNotary = artifacts.require('StarNotary');
var BigNumber = require('bignumber.js');

contract('StarNotary', accounts => {
    // Const and variable
    const user1 = accounts[1];
    const user2 = accounts[2];
    const operator = accounts[3];
    const randomUserTryingTostealTokens = accounts[4];
    const starData1 = {ra: 'ra_032.155', dec: 'dec_121.874', mag: 'mag_245.978', story: 'I love my wonderful star'};
    const hashStarTokenId1 = new BigNumber(web3.sha3(starData1.ra + starData1.dec + starData1.mag), 16).toNumber();
    const starData2 = {ra: 'ra_032.156', dec: 'dec_121.874', mag: 'mag_345.978', story: 'Other Star'};
    const hashStarTokenId2 = new BigNumber(web3.sha3(starData2.ra + starData2.dec + starData2.mag), 16).toNumber();
    let tx;

    beforeEach(async () => { 
        this.contract = await StarNotary.new({from: accounts[0]});
    });

    describe('Can create a star', () => {
        
        it('Can create a star and get its coordinates', async () => {
            await this.contract.createStar(starData1.ra, starData1.dec, starData1.mag, starData1.story, hashStarTokenId1, {from: user1});
            const result = await this.contract.tokenIdToStarInfo(hashStarTokenId1);

            assert.equal(result[0], starData1.ra);
            assert.equal(result[1], starData1.dec);
            assert.equal(result[2], starData1.mag);
            assert.equal(result[3], starData1.story);
        });

        it('Can create a second star and get its coordinates', async () => {
            await this.contract.createStar(starData2.ra, starData2.dec, starData2.mag, starData2.story, hashStarTokenId2, {from: user1});
            const result = await this.contract.tokenIdToStarInfo(hashStarTokenId2);

            assert.equal(result[0], starData2.ra);
            assert.equal(result[1], starData2.dec);
            assert.equal(result[2], starData2.mag);
            assert.equal(result[3], starData2.story);
        });
    });

    describe('Check if star exist in Smart Contract', () => {
        beforeEach(async () => { 
            await this.contract.createStar(starData1.story, starData1.ra, starData1.dec, starData1.mag, hashStarTokenId1, {from: user1});    
        });
        
        it('Check if star is already assigned', async () => {
            const result = await this.contract.isStarExist(starData1.ra, starData1.dec, starData1.mag, {from: user1});
            assert.equal(result, true);
        });
    });

    describe('Check uniqueness of the Star token', () => {

        beforeEach(async () => { 
            await this.contract.createStar(starData1.ra, starData1.dec, starData1.mag, starData1.story, hashStarTokenId1, {from: user1});    
        });
        
        it('Cannot create a second star with the same coordinates', async () => {
            // Try to create a second star with the same coordinates like the previous one
            await expectThrow(this.contract.createStar(starData1.ra, starData1.dec, starData1.mag, starData1.story, hashStarTokenId1, {from: user1}));
        });
    });
    
    describe('Buying and selling stars', () => { 
        const starPrice = web3.toWei(.01, "ether")

        beforeEach(async () => { 
            await this.contract.createStar(starData1.ra, starData1.dec, starData1.mag, starData1.story, hashStarTokenId1, {from: user1});    
        });

        it('User1 can put up their star for sale', async () => { 
            assert.equal(await this.contract.ownerOf(hashStarTokenId1), user1);
            await this.contract.putStarUpForSale(hashStarTokenId1, starPrice, {from: user1});
            
            assert.equal(await this.contract.starsForSale(hashStarTokenId1), starPrice);
        });
        
        describe('User2 can buy a star that was put up for sale', () => {
            beforeEach(async () => { 
                await this.contract.putStarUpForSale(hashStarTokenId1, starPrice, {from: user1});
            });

            it('User2 is the owner of the star after they buy it', async () => { 
                await this.contract.buyStar(hashStarTokenId1, {from: user2, value: starPrice, gasPrice: 0});
                assert.equal(await this.contract.ownerOf(hashStarTokenId1), user2);
            });

            it('User2 ether balance changed correctly', async () => { 
                const overpaidAmount = web3.toWei(.05, 'ether');
                const balanceBeforeTransaction = web3.eth.getBalance(user2);
                await this.contract.buyStar(hashStarTokenId1, {from: user2, value: overpaidAmount, gasPrice: 0});
                const balanceAfterTransaction = web3.eth.getBalance(user2);

                assert.equal(balanceBeforeTransaction.sub(balanceAfterTransaction), starPrice);
            });
        });
    });

    describe('User1 can transfer a Star token', () => {

        beforeEach(async () => { 
            await this.contract.createStar(starData1.ra, starData1.dec, starData1.mag, starData1.story, hashStarTokenId1, {from: user1});
            tx = await this.contract.safeTransferFrom(user1, user2, hashStarTokenId1, {from: user1});   
        });

        it('Token has new owner, user2', async () => {
            assert.equal(await this.contract.ownerOf(hashStarTokenId1), user2);
        });

        it('Emits the correct event during a safe tranfer', async () => {
            assert.equal(tx.logs[0].event, 'Transfer');
            assert.equal(tx.logs[0].args.tokenId, hashStarTokenId1);
            assert.equal(tx.logs[0].args.to, user2);
            assert.equal(tx.logs[0].args.from, user1);
        });

        it('Only permissioned user can transfer tokens', async () => {
            await expectThrow(this.contract.safeTransferFrom(user1, randomUserTryingTostealTokens, hashStarTokenId1, {from: randomUserTryingTostealTokens}));
        });

    });

    describe('Can grant approval to transfer', () => {

        beforeEach(async () => { 
            await this.contract.createStar(starData1.ra, starData1.dec, starData1.mag, starData1.story, hashStarTokenId1, {from: user1});
            tx = await this.contract.approve(user2, hashStarTokenId1, {from: user1});   
        });

        it('User2 is setted as an approved address', async () => {
            assert.equal(await this.contract.getApproved(hashStarTokenId1), user2);
        });

        it('User2 can now transfer the tokenId 1', async () => {
            await this.contract.transferFrom(user1, user2, hashStarTokenId1, {from: user2});

            assert.equal(await this.contract.ownerOf(hashStarTokenId1), user2);
        });

        it('Emits the correct event', async () => {
            assert.equal(tx.logs[0].event, 'Approval');
        });
    });

    describe('Can set an operator', () => {
        beforeEach(async () => { 
            await this.contract.createStar(starData1.ra, starData1.dec, starData1.mag, starData1.story, hashStarTokenId1, {from: user1});
            tx = await this.contract.setApprovalForAll(operator, true, {from: user1});  
        });

        it('Can set an operator', async () => {
            assert.equal(await this.contract.isApprovedForAll(user1, operator), true);
        });

        it('Emits the correct event', async () => {
            assert.equal(tx.logs[0].event, 'ApprovalForAll');
        });
    });

});

const expectThrow = async (promise) => {
    try {
        await promise;
    } catch (error) {
        assert.exists(error);
        return;
    }

    assert.fail('Expected an error but didnt see one!');
};