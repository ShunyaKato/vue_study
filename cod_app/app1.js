new Vue({
  el: '#app',
  data: {
    selectItems: [
      {
        id: "mode",
        title: "ゲームモード",
        lists: ["Team Deathmatch", "Cyber Attack", "Domination", "Search and Destroy", "Headquarters", "Hardpoint", "Free-for-all", "Kill Confirmed", "Ground War"]
      },
      {
        id: "map",
        title: "マップ",
        lists: ["Aniyah Palace", "Arklov Peak", "Azhir Cave", "Euphrates Bridge", "Grazna Raid", "Gun Runner", "Hackney Yard", "Piccadilly", "Rammaza", "Rust", "shipment", "Shoot House", "St. Petrograd",]
      },
      {
        id: "weapon",
        title: "メイン武器",
        lists: [
          {
            weaponType: "AR",
            items: ["Kilo 141", "FAL", "M4A1", "FR 5.56", "Oden", "M13", "FN Scar 17", "AK-47"]
          },
          {
            weaponType: "SMG",
            items: ["AUG", "P90", "MP5", "Uzi", "PP19 Bizon", "MP7"]
          },
          {
            weaponType: "SG",
            items: ["Model 680", "R9-0 Shotgun", "725", "Origin 12 Shotgun"]
          },
          {
            weaponType: "LMG",
            items: ["PKM", "SA87", "M92", "MG34"]
          },
          {
            weaponType: "MR",
            items: ["EBR-14", "MK2 Carbine", "Kar98K"]
          },
          {
            weaponType: "SR",
            items: ["Dragunov", "HDR", "AX-50"]
          },
        ]
      },
    ],
    test: '',
    selectedItems: { mode: null, map: null, weaponType: null, weapon: null },
    selectedWeaponType: '',
    selectedWeapons: [],
    // selectedWeapon: '',
    killCount: '',
    deathCount: '',
    combatRecords: [],
  },
  methods: {
    weaponTypeSelect() {
      this.selectedItems.weaponType = this.selectedWeaponType;
      const weaponArray = _.filter(this.selectItems, { id: "weapon" });
      let selectedWeapons = _.filter(weaponArray[0].lists, { weaponType: this.selectedWeaponType });
      this.selectedWeapons = selectedWeapons[0] || [];
      this.selectedItems.weapon = selectedWeapons[0].items[0];
    },
    weaponSelect(event) {
      this.selectedItems.weapon = event.srcElement.value;
      console.log("選んだ武器")
      console.log(this.selectedItems.weapon)
    },
    itemSelect(event) {
      // console.log(event.srcElement.value);
      // console.log(event);
      // console.log(event.srcElement.dataset.id);
      const id = event.srcElement.dataset.id;
      this.selectedItems[id] = event.srcElement.value;
      // console.log(this.selectedItems);
      console.log(this.combatRecords);
    },
    saveLocalCombatRecords() {
      localStorage.setItem('combatRecords', JSON.stringify(this.combatRecords));
    },
    loadLocalCombatRecords() {
      this.combatRecords = JSON.parse(localStorage.getItem('combatRecords'));
      if (!this.combatRecords) {
        this.combatRecords = [];
      }
    },
    saveCombatRecord() {
      this.selectedItems.kill = this.killCount;
      // console.log(this.selectedItems);
      this.selectedItems.death = this.deathCount;
      this.selectedItems.killDeathRaito = parseInt((this.killCount / this.deathCount) * 10, 10) / 10;
      // console.log(this.selectedItems);
      this.combatRecords.unshift(Object.assign({}, this.selectedItems));
      // console.log(this.combatRecords);
      this.saveLocalCombatRecords();
    },
    deleteCombatRecord() {
      this.combatRecords = [];
      this.saveLocalCombatRecords();
    }
  },
  mounted: function () {
    this.loadLocalCombatRecords();
  }
});