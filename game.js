//Document Elements
var currentMoneyText     = document.getElementById("stats-money");
var lifetimeEarningText  = document.getElementById("stats-lifesavings");
var EPCText              = document.getElementById("stats-manualvalue");
var EPSText              = document.getElementById("stats-autovalue");
var totalAssetsText      = document.getElementById("total-assets");
var totalAchievementText = document.getElementById("total-achievements");

var clickerGame = {
  "userstats": {
    "currentMoney":     30,
    "lifetimesavings":  0,
    "assetsOwned":      [0, 0, 0, 0, 0],
    "achievements":     [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },
  "progression": {
    "manualClickValue": 1,
    "autoClickValue":   0
  },
  "settings": {
    "assets": [
      { "assetName": "Asset01", "assetCost": 30,  "assetEarning": 1 },
      { "assetName": "Asset02", "assetCost": 50,  "assetEarning": 5 },
      { "assetName": "Asset03", "assetCost": 150, "assetEarning": 9 },
      { "assetName": "Asset04", "assetCost": 350, "assetEarning": 15 },
      { "assetName": "Asset05", "assetCost": 950, "assetEarning": 25 }
    ],
    "achievements": [
      { "achievementName": "Achievement01", "requirementdesc": "desc01", "reward": 100 },
      { "achievementName": "Achievement02", "requirementdesc": "desc02", "reward": 200 },
      { "achievementName": "Achievement03", "requirementdesc": "desc03", "reward": 300 },
      { "achievementName": "Achievement04", "requirementdesc": "desc04", "reward": 400 },
      { "achievementName": "Achievement05", "requirementdesc": "desc05", "reward": 500 },
      { "achievementName": "Achievement06", "requirementdesc": "desc06", "reward": 600 },
      { "achievementName": "Achievement07", "requirementdesc": "desc07", "reward": 700 },
      { "achievementName": "Achievement08", "requirementdesc": "desc08", "reward": 800 },
      { "achievementName": "Achievement09", "requirementdesc": "desc09", "reward": 900 },
      { "achievementName": "Achievement10", "requirementdesc": "desc10", "reward": 1000 }
    ]
  },

  //Functions
  getTotalInArray: function(aArray) {
    var totalResult = 0;
    for(var i = 0; i < aArray.length; i++) {
      if(aArray[i] != 0) totalResult++;
    }
    return totalResult;
  },

  updateStats: function() {
    currentMoneyText.innerHTML = this.userstats.currentMoney;
    lifetimeEarningText.innerHTML = this.userstats.lifetimesavings;
    EPCText.innerHTML = this.progression.manualClickValue;
    EPSText.innerHTML = (this.progression.autoClickValue).toFixed(2);
    totalAssetsText.innerHTML = this.getTotalInArray(this.userstats.assetsOwned);
    totalAchievementText.innerHTML = this.getTotalInArray(this.userstats.achievements);
    this.checkAvailableAssets();
  },

  checkAvailableAssets: function() {
    for(var i = 0; i < (this.settings.assets).length; i++) {
      var assetButton = document.getElementById("asset0" + i);
      if(this.userstats.currentMoney < this.settings.assets[i].assetCost) {
        assetButton.disabled = true;
      } else {
        assetButton.disabled = false;
      }
    }
  },

  populateAssetsDiv: function() {
    for(var i = 0; i < (this.settings.assets).length; i++) {
      var assetButton = document.createElement("button");
      assetButton.id = "asset0" + i;
      assetButton.onclick = function(){
        var index = i;
        return clickerGame.buyAsset(index);
      };
      var assetName = document.createTextNode(this.settings.assets[i].assetName);
      assetButton.appendChild(assetName);
      var location = document.getElementById("shop");
      location.appendChild(assetButton);
    }
  },

  populateAchievementsDiv: function() {
    for(var i = 0; i < (this.settings.achievements).length; i++) {
      var achievementParagraph = document.createElement("p");
      var achievementName = document.createTextNode(this.settings.achievements[i].achievementName);
      achievementParagraph.appendChild(achievementName);
      var location = document.getElementById("achievements");
      location.appendChild(achievementParagraph);
    }
  },

  initGame: function() {
    this.populateAssetsDiv();
    this.populateAchievementsDiv();
    this.updateStats();
    //this.startAutoEarning();
  },

  manualClick: function() {
    this.userstats.currentMoney += this.progression.manualClickValue;
    this.userstats.lifetimesavings += this.progression.manualClickValue;
    this.updateStats();
  },

  startAutoEarning: function() {
    window.setInterval(function(){
      this.userstats.currentMoney += this.progression.autoClickValue;
      this.userstats.lifetimesavings += this.progression.autoClickValue;
      this.updateStats();
    }, 1000);
  },

  buyAsset: function(buildingID) {
    if(this.userstats.currentMoney >= this.settings.assets[buildingID].assetCost) {
      this.userstats.currentMoney -= this.settings.assets[buildingID].assetCost;
      this.userstats.autoClickValue += this.settings.assets[buildingID].assetEarning;
      //Increase asset cost - Log(n) + x
      this.userstats.assetsOwned[buildingID] += 1;
      this.updateStats();
    }
  }

}

clickerGame.initGame();
