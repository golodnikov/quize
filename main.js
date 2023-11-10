class Field {
      constructor(inputElement) {
        this.input = inputElement;
        this.value = '';
        this.valid = false;
        this.error = '';

        this.input.addEventListener('input', this.handleInput.bind(this));
      }

      handleInput() {
        this.value = this.input.value.trim();
        this.validate();
      }

      validate() {
        
      }
    }

    class NameField extends Field {
      validate() {
        this.valid = this.value !== '';
        this.error = this.valid ? '' : 'Поле обязательно для заполнения 😕';
      }
    }

    class PhoneField extends Field {
      validate() {
        const phoneRegex = /^\+7\s?\d{3}\s?\d{7}$/;
        this.valid = phoneRegex.test(this.value);
        this.error = this.valid ? '' : 'Введите правильный номер телефона ☎️';
      }
    }

    class EmailField extends Field {
      validate() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.valid = emailRegex.test(this.value);
        this.error = this.valid ? '' : 'Введите правильный адрес электронной почты ✉️';
      }
    }

    class ProductField {
      constructor(selectElement) {
        this.select = selectElement;
        this.value = '';
        this.valid = false;
        this.error = '';

        this.select.addEventListener('change', this.handleChange.bind(this));
      }

      handleChange() {
        this.value = this.select.value;
        this.validate();
        updateTotalPrice();
      }

      validate() {
        this.valid = this.value !== '';
        this.error = this.valid ? '' : 'Выберите товар 🛒';
      }
    }

    class QuantityField extends Field {
      validate() {
        this.valid = /^[1-9]\d*$/.test(this.value);
        this.error = this.valid ? '' : 'Введите только цифры больше нуля 🔢';
      }
    }

    class CheckboxField {
      constructor(checkboxElement) {
        this.checkbox = checkboxElement;
        this.checked = false;
        this.error = '';

        this.checkbox.addEventListener('change', this.handleChange.bind(this));
      }

      handleChange() {
        this.checked = this.checkbox.checked;
        updateTotalPrice();
      }
    }

    const firstNameInput = new NameField(document.getElementById('firstName'));
    const lastNameInput = new NameField(document.getElementById('lastName'));
    const phoneInput = new PhoneField(document.getElementById('phone'));
    const emailInput = new EmailField(document.getElementById('email'));

    const productSelect = new ProductField(document.getElementById('product'));

    const quantityInput = new QuantityField(document.getElementById('quantity'));

    const checkboxInput = new CheckboxField(document.getElementById('checkbox'));

    const nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled = true;

    function validateStep1() {
      const fields = [firstNameInput, lastNameInput, phoneInput, emailInput];
      const allFieldsValid = fields.every((field) => field.valid);

      nextBtn.disabled = !allFieldsValid;
    }

    firstNameInput.input.addEventListener('input', validateStep1);
    lastNameInput.input.addEventListener('input', validateStep1);
    phoneInput.input.addEventListener('input', validateStep1);
    emailInput.input.addEventListener('input', validateStep1);

    function updateTotalPrice() {
      let price = 0;

      if (productSelect.value === 'Диски для авто') {
        if (quantityInput.value > 0) {
          price += 1000 * quantityInput.value;
        }
      } else if (productSelect.value === 'Резина для авто') {
        if (quantityInput.value > 0) {
          price += 1500 * quantityInput.value;
        }
      }

      if (checkboxInput.checked) {
        price += 1500;
      }

      totalPrice.textContent = `Общая стоимость: ${price} руб. 💰`;

      submitBtn.disabled = !productSelect.valid || !quantityInput.valid;
    }

    productSelect.select.addEventListener('change', updateTotalPrice);
    quantityInput.input.addEventListener('input', updateTotalPrice);
    checkboxInput.checkbox.addEventListener('change', updateTotalPrice);

    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = true;

    nextBtn.addEventListener('click', () => {
      document.getElementById('step1').style.display = 'none';
      document.getElementById('step2').style.display = 'block';
    });

    submitBtn.addEventListener('click', () => {
      const firstName = firstNameInput.value;
      const lastName = lastNameInput.value;
      const phone = phoneInput.value;
      const email = emailInput.value;
      const product = productSelect.value;
      const quantity = quantityInput.value;
      const checkbox = checkboxInput.checked;

      firstNameInput.input.value = '';
      lastNameInput.input.value = '';
      phoneInput.input.value = '';
      emailInput.input.value = '';
      productSelect.select.value = '';
      quantityInput.input.value = '';
      checkboxInput.checkbox.checked = false;
      totalPrice.textContent = '';

      const resultContainer = document.getElementById('result');
      resultContainer.textContent = `Заказ: ${firstName} ${lastName}, Телефон: ${phone}, Email: ${email}, 
        Товар: ${product}, Количество: ${quantity}, Установка: ${checkbox ? 'Да' : 'Нет'}, 
        ${totalPrice.textContent}`;

      localStorage.clear();

      document.getElementById('step2').style.display = 'none';
      resultContainer.style.display = 'block';
    });



  




  


  
  
  
