document.addEventListener('DOMContentLoaded', function () {
    // Завдання 1
    swapBlockContents('.block4', '.block5');

    // Завдання 2
    var semiMajorAxis = getRandomNumber(5, 15);
    var semiMinorAxis = getRandomNumber(3, 10);
    calculateAndDisplayArea(semiMajorAxis, semiMinorAxis);

    // Завдання 3
    var textForm = document.querySelector('.block3 textarea');
    setupTextForm(textForm);

    // Завдання 4
    setupBlockEditor('.block3');

    // Завдання 5
    var alignLeftCheckbox = document.getElementById('alignLeftCheckbox');
    setupAlignment(alignLeftCheckbox);
});

function swapBlockContents(selector1, selector2) {
    var block1 = document.querySelector(selector1);
    var block2 = document.querySelector(selector2);
    if (block1 && block2) {
        var temp = block1.innerHTML;
        block1.innerHTML = block2.innerHTML;
        block2.innerHTML = temp;
    } else {
        console.error('Один із елементів не існує на сторінці.');
    }
}

function calculateAndDisplayArea(semiMajorAxis, semiMinorAxis) {
    var ovalArea = Math.PI * semiMajorAxis * semiMinorAxis;
    var block3 = document.querySelector('.block3');
    block3.innerHTML += '<p>Площа овала: ' + ovalArea.toFixed(2) + '</p>';
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function countWords(text) {
    var words = text.split(/\s+/);
    return words.length;
}

function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]);
}

function setupTextForm(textForm) {
    if (textForm) {
        var savedText = getCookie('wordCountText');
        if (savedText && confirm('Знайдений збережений текст. Бажаєте видалити його?')) {
            document.cookie = 'wordCountText=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            savedText = '';
        }
        textForm.value = savedText;

        textForm.addEventListener('input', function () {
            var wordCount = countWords(textForm.value);
            alert('Кількість слів: ' + wordCount);
            document.cookie = 'wordCountText=' + encodeURIComponent(textForm.value) + '; path=/;';
        });
    }
}

function setupAlignment(alignLeftCheckbox) {
    alignLeftCheckbox.addEventListener('change', function () {
        var isAlignLeft = alignLeftCheckbox.checked;
        localStorage.setItem('alignLeft', isAlignLeft);
        setAlignment(isAlignLeft);
    });

    var savedAlignment = localStorage.getItem('alignLeft');
    if (savedAlignment !== null) {
        alignLeftCheckbox.checked = savedAlignment === 'true';
        setAlignment(alignLeftCheckbox.checked);
    }
}

function setupBlockEditor(blockSelector) {
    var block = document.querySelector(blockSelector);
    if (block) {
        var blockList = document.createElement('select');
        for (var i = 1; i <= 7; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.text = 'Блок ' + i;
            blockList.add(option);
        }

        block.appendChild(blockList);

        var editTextarea = document.createElement('textarea');
        editTextarea.rows = 4;
        editTextarea.cols = 50;
        block.appendChild(editTextarea);

        var saveBtn = document.createElement('button');
        saveBtn.textContent = 'Зберегти';
        block.appendChild(saveBtn);

        var deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Видалити';
        block.appendChild(deleteBtn);

        var blockIndex;
        blockList.addEventListener('change', function () {
            blockIndex = blockList.value;
            var blockContent = localStorage.getItem('blockContent' + blockIndex);
            editTextarea.value = blockContent || '';
            editTextarea.style.fontStyle = 'normal';
        });

        saveBtn.addEventListener('click', function () {
            if (blockIndex) {
                var editedContent = editTextarea.value;
                localStorage.setItem('blockContent' + blockIndex, editedContent);
                alert('Зміст блока збережений!');
                editTextarea.style.fontStyle = 'italic';
            }
        });

        deleteBtn.addEventListener('click', function () {
            if (blockIndex) {
                localStorage.removeItem('blockContent' + blockIndex);
                editTextarea.value = '';
                editTextarea.style.fontStyle = 'normal';
                alert('Зміст блока видалений!');
            }
        });
    }
}

function setAlignment(isAlignLeft) {
    var blocks = document.querySelectorAll('.block3, .block4, .block5');
    var alignmentValue = isAlignLeft ? 'left' : '';

    blocks.forEach(function (block) {
        block.style.textAlign = alignmentValue;
    });
}
