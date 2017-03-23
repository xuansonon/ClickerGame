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
    "autoClickValue":   0,
  },
  "settings": {
    "assets": [
      { "assetName": "Asset00", "assetCost": 30,  "assetEarning": 1 },
      { "assetName": "Asset01", "assetCost": 50,  "assetEarning": 5 },
      { "assetName": "Asset02", "assetCost": 150, "assetEarning": 9 },
      { "assetName": "Asset03", "assetCost": 350, "assetEarning": 15 },
      { "assetName": "Asset04", "assetCost": 950, "assetEarning": 25 }
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
    ],
    "version":"1.0.0b",
    "developer": {
      "name":"Xuanson On",
      "email":"hello@xuansonon.com",
      "github":"xuansonon",
      "site":"www.xuansonon.com"
    }
  },

  //Functions
  getTotalInArray: function(aArray) {
    var totalResult = 0;
    for(var i = 0; i < aArray.length; i++) {
      totalResult += aArray[i];
    }
    return totalResult;
  },

  // minifyNumbers: function(value) {
  //   if(value > 10000) {
  //     conso
  //   }
  // }

  updateStats: function() {
    currentMoneyText.innerHTML = (this.userstats.currentMoney).toFixed(2);
    lifetimeEarningText.innerHTML = (this.userstats.lifetimesavings).toFixed(2);
    EPCText.innerHTML = this.progression.manualClickValue;
    EPSText.innerHTML = (this.progression.autoClickValue).toFixed(2);
    totalAchievementText.innerHTML = this.getTotalInArray(this.userstats.achievements);
    this.checkAvailableAssets();
    this.updateAssets();
  },

  updateAssets: function() {
    totalAssetsText.innerHTML = this.getTotalInArray(this.userstats.assetsOwned);
    for(var i = 0; i < this.settings.assets.length; i++) {
      document.getElementById("assetspan0" + i).innerHTML = this.userstats.assetsOwned[i];
      document.getElementById("assetbtn0" + i).innerHTML = this.settings.assets[i].assetName + " (Cost: $" + (this.settings.assets[i].assetCost).toFixed(2) +")";
    }
  },

  checkAvailableAssets: function() {
    for(var i = 0; i < (this.settings.assets).length; i++) {
      var assetButton = document.getElementById("assetbtn0" + i);
      if(this.userstats.currentMoney < this.settings.assets[i].assetCost) {
        assetButton.disabled = true;
      } else {
        assetButton.disabled = false;
      }
    }
  },

  populateAssetsDiv: function() {
    for(var i = 0; i < (this.settings.assets).length; i++) {
      var assetLine = document.createElement("p");
      assetLine.innerHTML += '<button id="assetbtn0'+ i +'" onclick="clickerGame.buyAsset('+i+')">' + this.settings.assets[i].assetName + " (Cost: $" + this.settings.assets[i].assetCost +")" + '</button> (Currently owned: <span id="assetspan0'+i+'"></span>)';
      var location = document.getElementById("shop");
      location.appendChild(assetLine);
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

  startAutoEarning: function() {
    window.setInterval(function(){
      clickerGame.userstats.currentMoney += (clickerGame.progression.autoClickValue)/235;
      clickerGame.userstats.lifetimesavings += (clickerGame.progression.autoClickValue)/235;
      clickerGame.updateStats();
    }, 1);
  },

  init: function() {
    currentMoneyText.innerHTML = this.userstats.currentMoney;
    lifetimeEarningText.innerHTML = this.userstats.lifetimesavings;
    EPCText.innerHTML = this.progression.manualClickValue;
    EPSText.innerHTML = (this.progression.autoClickValue).toFixed(2);
    totalAssetsText.innerHTML = this.getTotalInArray(this.userstats.assetsOwned);
    totalAchievementText.innerHTML = this.getTotalInArray(this.userstats.achievements);
    this.populateAssetsDiv();
    this.populateAchievementsDiv();
  },

  initGame: function() {
    this.init();
    this.startAutoEarning();
    this.updateStats();
  },

  manualClick: function() {
    this.userstats.currentMoney += this.progression.manualClickValue;
    this.userstats.lifetimesavings += this.progression.manualClickValue;
    this.updateStats();
  },

  buyAsset: function(buildingID) {
    var ID = buildingID;
    if(this.userstats.currentMoney >= this.settings.assets[ID].assetCost) {
      this.userstats.currentMoney -= this.settings.assets[ID].assetCost;
      this.userstats.assetsOwned[ID]++;
      this.progression.autoClickValue += this.settings.assets[ID].assetEarning;
      //Increase asset cost - Log(n) + x
      this.settings.assets[buildingID].assetCost *= 1.17;
      this.updateStats();
    }
  },

  //Experimental Export - BETA
  exportGame: function() {
    var exportString = "";
    exportString += this.userstats.currentMoney + "||" + this.userstats.lifetimesavings + "||";
    for(var i = 0; i < this.userstats.assetsOwned.length; i++) {
      exportString += this.userstats.assetsOwned[i];
      if(i != (this.userstats.assetsOwned.length - 1)) exportString += ",";
    }
    exportString += "||";
    for(var i = 0; i < this.userstats.achievements.length; i++) {
      exportString += this.userstats.achievements[i];
      if(i != (this.userstats.achievements.length - 1)) exportString += ",";
    }
    exportString += "||" + this.progression.manualClickValue + "||" + this.progression.autoClickValue;
    console.log(btoa(exportString));
  }
}

clickerGame.initGame();
