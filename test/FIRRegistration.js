const { expect } = require("chai");

describe("FIRRegistration", function () {
  let FIRRegistration;
  let firRegistration;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    FIRRegistration = await ethers.getContractFactory("FIRRegistration");
    [owner, addr1, addr2] = await ethers.getSigners();

    firRegistration = await FIRRegistration.deploy();
    await firRegistration.deployed();
  });

  it("Should register FIR", async function () {
    await firRegistration.registerFIR("Theft complaint");
    const complaint = await firRegistration.GetComplaint(1);
    expect(complaint[0]).to.equal("Theft complaint");
    expect(complaint[1]).to.equal(owner.address);
    expect(complaint[2]).to.be.false;
  });

  it("Should resolve FIR", async function () {
    await firRegistration.registerFIR("Theft complaint");
    await firRegistration.ResolvedFIR(1);
    const complaint = await firRegistration.GetComplaint(1);
    expect(complaint[2]).to.be.true;
  });

  it("Should get correct complaint count", async function () {
    await firRegistration.registerFIR("Theft complaint 1");
    await firRegistration.registerFIR("Theft complaint 2");
    await firRegistration.ResolvedFIR(1);
    const [activeFIRs, totalFIRs] = await firRegistration.complaint();
    expect(activeFIRs).to.equal(1);
    expect(totalFIRs).to.equal(2);
  });

  it("Should not allow resolving FIR by non-owner", async function () {
    await firRegistration.registerFIR("Theft complaint");
    await expect(firRegistration.connect(addr1).ResolvedFIR(1)).to.be.revertedWith("not owner");
  });
});
