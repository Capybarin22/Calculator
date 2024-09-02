/**
 * Калькулятор, реализованный на JavaScript.
 */

// Получение элементов DOM
const buttons = document.querySelectorAll('.calc__button');
const taskInput = document.querySelector('.calc__input_type_task');
const memoryInput = document.querySelector('.calc__input_type_memory');
const resultInput = document.querySelector('.calc__input_type_result');


/**
 * Обработчик события клика на кнопку.
 *
 * @param {string} buttonValue Текстовое значение кнопки.
 * @param {string} buttonClass Классы кнопки.
 */
const handleButtonClick = (buttonValue, buttonClass) => {
	// Обработка кнопки "="
	if (buttonValue === '=') {
		try {
			// Вычисление выражения
			const result = eval(taskInput.value);
			resultInput.value = result;
		} catch (error) {
			resultInput.value = 'Ошибка';
		}
	}
	// Обработка кнопок операций степени
	else if (buttonClass.includes('calc__button_type_operator_power')) {
		switch (buttonValue) {
			case 'x-1':
				taskInput.value = `${taskInput.value}**(-1)`;
				break;
			case 'xy':
				taskInput.value = `${taskInput.value}**`;
				break;
			case 'y√':
				taskInput.value = `${taskInput.value}**(1/`;
				break;
			case 'x2':
				taskInput.value = `${taskInput.value}**2`;
				break;
			case '2√':
				taskInput.value = `(${taskInput.value})**(1/2)`;
				break;
		}
	}
	// Обработка кнопки факториала
	else if (buttonClass.includes('calc__button_type_operator_factorial')) {
		taskInput.value = `${taskInput.value}factorial(`;
	} else if (
		['calc__button_type_number', 'calc__button_type_operator', 'calc__button_type_bracket', 'calc__button_type_constant'].some(
			cls => buttonClass.includes(cls)
		)
	) {
		taskInput.value += buttonValue;
	}
	// Обработка специальных кнопок
	else if (buttonClass.includes('calc__button_type_special')) {
		if (buttonValue === 'Clear All') {
			taskInput.value = '';
		} else if (buttonValue === 'Backspace') {
			taskInput.value = taskInput.value.slice(0, -1);
		}
	}
	// Обработка тригонометрических и логарифмических кнопок
	else if (['calc__button_type_trig', 'calc__button_type_log'].some(cls => buttonClass.includes(cls))) {
		taskInput.value += 'Math.' + buttonValue + '(';
	}
	// Обработка кнопок памяти
	else if (buttonClass.includes('calc__button_type_memory')) {
		handleMemory(buttonValue);
	}
};

// Добавление обработчиков событий для кнопок
buttons.forEach(button => {
	button.addEventListener('click', () => {
		handleButtonClick(button.textContent, button.className);
	});
});

function factorial(n) {
	if (n < 0) {
		throw new Error("Факториал не определён для отрицательных чисел");
	}
	let result = 1;
	for (let i = 2; i <= n; i++) {
		result *= i;
	}
	return result;
}

// Хранение значения в памяти
// let memoryValue = 0;
//	const handleMemory = (buttonValue) => {
//		const currentValue = parseFloat(taskInput.value) || 0;
//		switch (buttonValue) {
//			case 'M+':
//				memory += currentValue;
//				memoryInput.value = memory;
//				break;
//			case 'M-':
//				memory -= currentValue;
//				memoryInput.value = memory;
//				break;
//			case 'MC':
//				memory = 0;
//				memoryInput.value = '';
//				break;
//			case 'MS':
//				memory = currentValue;
//				memoryInput.value = memory;
//				break;
//			case 'MR':
//				taskInput.value = memory.toString();
//				break;
//			default:
//				console.error('Unknown button value:', buttonValue);
//		}
//	};
