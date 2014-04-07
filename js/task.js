/**
 * Создает экземпляр космического корабля.
 * @name Vessel
 * @param {String} name Название корабля.
 * @param {Number}[] position Местоположение корабля.
 * @param {Number} capacity Грузоподъемность корабля.
 * @param {Number} cargoWeight Вес загружаемого груза.
 */
function Vessel(name, position, capacity) {
	this.name = name;
	this.position = position;
	this.capacity = capacity;
	this.cargoWeight = 0;
}

/**
 * Выводит текущее состояние корабля: имя, местоположение, доступную грузоподъемность.
 * @example
 * vessel.report(); // Грузовой корабль. Местоположение: Земля. Товаров нет.
 * @example
 * vesserl.report(); // Грузовой корабль. Местоположение: 50,20. Груз: 200т.
 * @name Vessel.report
 */
Vessel.prototype.report = function () {
	
	return 'Корабль "' + this.name + '". Местоположение: ' + this.position.join() + '. Занято: ' + this.cargoWeight + ' из ' + this.capacity + 'т.</br>';
}

/**
 * Выводит количество свободного места на корабле.
 * @name Vessel.getFreeSpace
 */
Vessel.prototype.getFreeSpace = function () {
	
	return this.capacity - this.cargoWeight;
}

/**
 * Выводит количество занятого места на корабле.
 * @name Vessel.getOccupiedSpace
 */
Vessel.prototype.getOccupiedSpace = function () {
	
	return this.cargoWeight;
}

/**
 * Переносит корабль в указанную точку.
 * @param {Number}[]|Planet newPosition Новое местоположение корабля.
 * @example
 * vessel.flyTo([1,1]);
 * @example
 * var earth = new Planet('Земля', [1,1]);
 * vessel.flyTo(earth);
 * @name Vessel.report
 */
Vessel.prototype.flyTo = function (newPosition) {
	this.position = newPosition.position;
}

/**
 * Создает экземпляр планеты.
 * @name Planet
 * @param {String} name Название Планеты.
 * @param {Number}[] position Местоположение планеты.
 */
function Planet(name, position, availableAmountOfCargo) {
	this.name = name;
	this.position = position;
	this.availableAmountOfCargo = availableAmountOfCargo;
}

/**
 * Выводит текущее состояние планеты: имя, местоположение, количество доступного груза.
 * @name Planet.report
 */
Planet.prototype.report = function () {
	var cargoState = '';

	this.availableAmountOfCargo > 0 ?
		cargoState = cargoState + 'Доступно груза: ' + this.availableAmountOfCargo + 'т.' :		
		cargoState = cargoState + 'Груза нет. ';

	return 'Планета "' + this.name + '". Местоположение: ' + this.position.join() + '. ' + cargoState + '</br>';
}

/**
 * Возвращает доступное количество груза планеты.
 * @name Vessel.getAvailableAmountOfCargo
 */
Planet.prototype.getAvailableAmountOfCargo = function () {
	
	return this.availableAmountOfCargo;
}

/**
 * Загружает на корабль заданное количество груза.
 * Перед загрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Загружаемый корабль.
 * @param {Number} cargoWeight Вес загружаемого груза.
 * @name Vessel.loadCargoTo
 */
Planet.prototype.loadCargoTo = function (vessel, cargoWeight) {
	if (!(vessel.position[0] == this.position[0] && vessel.position[1] == this.position[1])) { return 'Сначала нужно подлететь к планете</br>' };

	if (vessel.getFreeSpace() >= cargoWeight) {
		vessel.cargoWeight = vessel.cargoWeight + cargoWeight;
		this.availableAmountOfCargo = this.availableAmountOfCargo - cargoWeight;
		
		return 'погрузка завершена</br>';
	} else {
		this.availableAmountOfCargo = this.availableAmountOfCargo - vessel.getFreeSpace();
		vessel.cargoWeight = vessel.capacity;
		
		return 'Не хватает груза. Загрузим только ' + vessel.getFreeSpace() + ' т.<br/>';
	}
}

/**
 * Выгружает с корабля заданное количество груза.
 * Перед выгрузкой корабль должен приземлиться на планету.
 * @param {Vessel} vessel Разгружаемый корабль.
 * @param {Number} cargoWeight Вес выгружаемого груза.
 * @name Vessel.unloadCargoFrom 
 */
Planet.prototype.unloadCargoFrom = function (vessel, cargoWeight) {
	if (!(vessel.position[0] == this.position[0] && vessel.position[1] == this.position[1])) { return 'Сначала нужно подлететь к планете</br>' };

	if (vessel.getOccupiedSpace() >= cargoWeight) {
		vessel.cargoWeight = vessel.cargoWeight - cargoWeight;
		this.availableAmountOfCargo = this.availableAmountOfCargo + cargoWeight;
		
		return 'сброс груза завершен</br>';
	} else {
		this.availableAmountOfCargo = this.availableAmountOfCargo + vessel.getOccupiedSpace();	
		vessel.cargoWeight = 0;
		
		return 'Нет столько груза. Сгрузим только ' + vessel.getOccupiedSpace() + ' т.</br>';
	}
}