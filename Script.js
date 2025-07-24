// Global variables for the visualization
let array = [];
let arraySize = 50;
let animationSpeed = 50; // milliseconds
let isSorting = false;
let comparisons = 0;
let swaps = 0;
let canvas, ctx;
let timeoutId = null; // To store the timeout ID for stopping animations

// --- Utility Functions ---

/**
 * Delays execution for a given number of milliseconds.
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>} A promise that resolves after the specified delay.
 */
const delay = (ms) => new Promise(resolve => timeoutId = setTimeout(resolve, ms));

/**
 * Swaps two elements in the array.
 * @param {number[]} arr - The array to modify.
 * @param {number} i - Index of the first element.
 * @param {number} j - Index of the second element.
 */
const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    swaps++; // Increment swap counter
};

/**
 * Updates the displayed metrics (comparisons, swaps, complexity).
 * @param {string} algoName - The name of the current algorithm to update complexity.
 */
const updateMetrics = (algoName = '') => {
    document.getElementById('comparisons').textContent = comparisons;
    document.getElementById('swaps').textContent = swaps;

    // Update complexity based on algorithm
    const timeComplexityEl = document.getElementById('timeComplexity');
    const spaceComplexityEl = document.getElementById('spaceComplexity');

    switch (algoName) {
        case 'bubbleSort':
            timeComplexityEl.innerHTML = 'O(n<sup>2</sup>)';
            spaceComplexityEl.innerHTML = 'O(1)';
            break;
        case 'selectionSort':
            timeComplexityEl.innerHTML = 'O(n<sup>2</sup>)';
            spaceComplexityEl.innerHTML = 'O(1)';
            break;
        case 'insertionSort':
            timeComplexityEl.innerHTML = 'O(n<sup>2</sup>)';
            spaceComplexityEl.innerHTML = 'O(1)';
            break;
        case 'mergeSort':
            timeComplexityEl.innerHTML = 'O(n log n)';
            spaceComplexityEl.innerHTML = 'O(n)';
            break;
        case 'quickSort':
            timeComplexityEl.innerHTML = 'O(n log n) average, O(n<sup>2</sup>) worst';
            spaceComplexityEl.innerHTML = 'O(log n) average, O(n) worst';
            break;
        case 'heapSort':
            timeComplexityEl.innerHTML = 'O(n log n)';
            spaceComplexityEl.innerHTML = 'O(1)';
            break;
        default:
            timeComplexityEl.textContent = 'N/A';
            spaceComplexityEl.textContent = 'N/A';
            break;
    }
};

/**
 * Generates a new array of random integers.
 */
const generateNewArray = () => {
    array = [];
    comparisons = 0;
    swaps = 0;
    isSorting = false; // Ensure sorting is stopped
    clearTimeout(timeoutId); // Clear any pending timeouts
    updateMetrics(); // Reset metrics display

    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * (canvas.height - 50)) + 10); // Values between 10 and canvas.height-50
    }
    drawArray(); // Draw the newly generated array
};

/**
 * Draws the array as bars on the canvas.
 * @param {number[]} [highlightedIndices=[]] - Indices of elements to highlight (e.g., comparing).
 * @param {number[]} [sortedIndices=[]] - Indices of elements that are sorted.
 * @param {number} [pivotIndex=-1] - Index of the pivot element (for Quick Sort).
 * @param {number[]} [swappingIndices=[]] - Indices of elements currently being swapped.
 */
const drawArray = (highlightedIndices = [], sortedIndices = [], pivotIndex = -1, swappingIndices = []) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas

    const barWidth = canvas.width / array.length;
    for (let i = 0; i < array.length; i++) {
        const barHeight = array[i];
        const x = i * barWidth;
        const y = canvas.height - barHeight;

        ctx.beginPath();
        ctx.rect(x, y, barWidth, barHeight);

        // Set bar color based on its state
        if (sortedIndices.includes(i)) {
            ctx.fillStyle = '#10b981'; // emerald-500 (sorted)
        } else if (pivotIndex === i) {
            ctx.fillStyle = '#ef4444'; // red-500 (pivot)
        } else if (highlightedIndices.includes(i)) {
            ctx.fillStyle = '#f59e0b'; // amber-500 (comparing)
        } else if (swappingIndices.includes(i)) {
            ctx.fillStyle = '#8b5cf6'; // violet-500 (swapping)
        } else {
            ctx.fillStyle = '#3b82f6'; // blue-500 (default)
        }
        ctx.fill();
        ctx.closePath();
    }
};

// --- Sorting Algorithms ---

/**
 * Bubble Sort Algorithm visualization.
 */
async function bubbleSort() {
    const n = array.length;
    let sortedCount = 0; // Keep track of elements that are already sorted at the end

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            if (!isSorting) return; // Stop if sorting is cancelled
            comparisons++;
            drawArray([j, j + 1], array.slice(n - sortedCount).map((_, idx) => n - sortedCount + idx)); // Highlight comparing elements, keep sorted elements colored

            await delay(animationSpeed);

            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
                drawArray([j, j + 1], array.slice(n - sortedCount).map((_, idx) => n - sortedCount + idx), -1, [j, j + 1]); // Highlight swapping elements
                await delay(animationSpeed);
            }
            updateMetrics('bubbleSort');
        }
        sortedCount++; // One more element is sorted at the end
    }
    drawArray([], Array.from({ length: n }, (_, i) => i)); // All elements sorted
    isSorting = false;
}

/**
 * Selection Sort Algorithm visualization.
 */
async function selectionSort() {
    const n = array.length;
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < n; j++) {
            if (!isSorting) return;
            comparisons++;
            drawArray([i, j], Array.from({ length: i }, (_, idx) => idx), minIndex); // Highlight current, comparing, and minIndex
            await delay(animationSpeed);

            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
            updateMetrics('selectionSort');
        }
        if (minIndex !== i) {
            swap(array, i, minIndex);
            drawArray([i, minIndex], Array.from({ length: i }, (_, idx) => idx), -1, [i, minIndex]); // Highlight swapping
            await delay(animationSpeed);
        }
    }
    drawArray([], Array.from({ length: n }, (_, i) => i));
    isSorting = false;
}

/**
 * Insertion Sort Algorithm visualization.
 */
async function insertionSort() {
    const n = array.length;
    for (let i = 1; i < n; i++) {
        let current = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > current) {
            if (!isSorting) return;
            comparisons++;
            drawArray([j, j + 1], Array.from({ length: i }, (_, idx) => idx), -1, [j, j + 1]); // Highlight comparing and shifting
            await delay(animationSpeed);

            array[j + 1] = array[j];
            swaps++; // Count as a move/shift
            j--;
            updateMetrics('insertionSort');
        }
        array[j + 1] = current;
        swaps++; // Count final insertion as a move
    }
    drawArray([], Array.from({ length: n }, (_, i) => i));
    isSorting = false;
}

/**
 * Merge Sort Algorithm visualization.
 */
async function mergeSort(arr, l, r) {
    if (!isSorting) return;
    if (l >= r) {
        return;
    }
    const m = Math.floor((l + r) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
}

async function merge(arr, l, m, r) {
    const n1 = m - l + 1;
    const n2 = r - m;

    const L = new Array(n1);
    const R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    let i = 0;
    let j = 0;
    let k = l;

    while (i < n1 && j < n2) {
        if (!isSorting) return;
        comparisons++;
        drawArray([l + i, m + 1 + j], [], -1, Array.from({ length: k - l }, (_, idx) => l + idx)); // Highlight elements being merged
        await delay(animationSpeed);

        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        swaps++; // Count as a move
        k++;
        updateMetrics('mergeSort');
    }

    while (i < n1) {
        if (!isSorting) return;
        arr[k] = L[i];
        swaps++; // Count as a move
        i++;
        k++;
        updateMetrics('mergeSort');
        drawArray([], [], -1, Array.from({ length: k - l }, (_, idx) => l + idx)); // Highlight elements being moved
        await delay(animationSpeed);
    }

    while (j < n2) {
        if (!isSorting) return;
        arr[k] = R[j];
        swaps++; // Count as a move
        j++;
        k++;
        updateMetrics('mergeSort');
        drawArray([], [], -1, Array.from({ length: k - l }, (_, idx) => l + idx)); // Highlight elements being moved
        await delay(animationSpeed);
    }

    // Mark the merged section as sorted (temporarily, until final sort)
    drawArray([], Array.from({ length: r - l + 1 }, (_, idx) => l + idx));
    await delay(animationSpeed);

    // If it's the final merge, mark all as sorted
    if (l === 0 && r === array.length - 1) {
        drawArray([], Array.from({ length: array.length }, (_, i) => i));
        isSorting = false;
    }
}

/**
 * Quick Sort Algorithm visualization.
 */
async function quickSort(arr, low, high) {
    if (!isSorting) return;
    if (low < high) {
        let pi = await partition(arr, low, high);
        await quickSort(arr, low, pi - 1);
        await quickSort(arr, pi + 1, high);
    }
    // Mark all as sorted if the initial call finishes
    if (low === 0 && high === array.length - 1) {
        drawArray([], Array.from({ length: array.length }, (_, i) => i));
        isSorting = false;
    }
}

async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {
        if (!isSorting) return;
        comparisons++;
        drawArray([j], [], high); // Highlight current element and pivot
        await delay(animationSpeed);

        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
            drawArray([i, j], [], high, [i, j]); // Highlight swapping
            await delay(animationSpeed);
        }
        updateMetrics('quickSort');
    }
    swap(arr, i + 1, high);
    drawArray([i + 1, high], [], -1, [i + 1, high]); // Highlight final pivot placement
    await delay(animationSpeed);
    return (i + 1);
}

/**
 * Heap Sort Algorithm visualization.
 */
async function heapSort() {
    const n = array.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if (!isSorting) return;
        await heapify(array, n, i, []);
    }

    // One by one extract elements from heap
    for (let i = n - 1; i > 0; i--) {
        if (!isSorting) return;
        // Move current root to end
        swap(array, 0, i);
        drawArray([0, i], Array.from({ length: n - i }, (_, idx) => i + idx), -1, [0, i]); // Highlight swapping, mark sorted part
        await delay(animationSpeed);

        // call max heapify on the reduced heap
        await heapify(array, i, 0, Array.from({ length: n - i }, (_, idx) => i + idx));
        updateMetrics('heapSort');
    }
    drawArray([], Array.from({ length: n }, (_, i) => i)); // All elements sorted
    isSorting = false;
}

async function heapify(arr, n, i, sortedIndices) {
    let largest = i; // Initialize largest as root
    let l = 2 * i + 1; // left = 2*i + 1
    let r = 2 * i + 2; // right = 2*i + 2

    // If left child is larger than root
    if (l < n) {
        comparisons++;
        drawArray([largest, l], sortedIndices);
        await delay(animationSpeed);
        if (arr[l] > arr[largest]) {
            largest = l;
        }
    }

    // If right child is larger than largest so far
    if (r < n) {
        comparisons++;
        drawArray([largest, r], sortedIndices);
        await delay(animationSpeed);
        if (arr[r] > arr[largest]) {
            largest = r;
        }
    }

    // If largest is not root
    if (largest !== i) {
        swap(arr, i, largest);
        drawArray([i, largest], sortedIndices, -1, [i, largest]); // Highlight swapping
        await delay(animationSpeed);

        // Recursively heapify the affected sub-tree
        await heapify(arr, n, largest, sortedIndices);
    }
    updateMetrics('heapSort');
}


// --- Event Handlers ---

/**
 * Starts the selected sorting algorithm.
 */
const startSorting = async () => {
    if (isSorting) {
        console.log("Already sorting or reset needed.");
        return;
    }
    isSorting = true;
    comparisons = 0;
    swaps = 0;
    updateMetrics(document.getElementById('algorithmSelect').value); // Reset metrics and set initial complexity

    const selectedAlgorithm = document.getElementById('algorithmSelect').value;

    // Deep copy array to allow reset to initial state if needed, though generateNewArray handles this mostly
    const arrayCopy = [...array];

    switch (selectedAlgorithm) {
        case 'bubbleSort':
            await bubbleSort();
            break;
        case 'selectionSort':
            await selectionSort();
            break;
        case 'insertionSort':
            await insertionSort();
            break;
        case 'mergeSort':
            await mergeSort(array, 0, array.length - 1);
            break;
        case 'quickSort':
            await quickSort(array, 0, array.length - 1);
            break;
        case 'heapSort':
            await heapSort();
            break;
        default:
            console.error("Unknown algorithm selected.");
            isSorting = false;
            break;
    }

    isSorting = false; // Mark as finished
    drawArray([], Array.from({ length: array.length }, (_, i) => i)); // Ensure all bars are green (sorted)
    console.log("Sorting finished!");
};

/**
 * Resets the visualization, stopping any ongoing sort and generating a new array.
 */
const resetVisualization = () => {
    isSorting = false;
    clearTimeout(timeoutId); // Clear any pending timeouts
    generateNewArray();
    updateMetrics(); // Reset metrics display
    console.log("Visualization reset.");
};

// --- Initialization ---

/**
 * Initializes the application when the DOM is loaded.
 */
const initializeApp = () => {
    canvas = document.getElementById('sortCanvas');
    ctx = canvas.getContext('2d');

    // Set canvas dimensions dynamically or based on initial values
    // For responsiveness, you might want to adjust canvas.width based on window.innerWidth
    // For now, fixed width/height for visualization clarity.
    // Adjust canvas height to be relative to its container or viewport for better responsiveness
    const parentWidth = canvas.parentElement.clientWidth;
    canvas.width = Math.min(900, parentWidth * 0.95); // Max 900px, but responsive to parent
    canvas.height = Math.min(500, canvas.width * (5/9)); // Maintain aspect ratio if width changes

    // Event Listeners
    document.getElementById('generateArrayBtn').addEventListener('click', generateNewArray);
    document.getElementById('startSortBtn').addEventListener('click', startSorting);
    document.getElementById('resetBtn').addEventListener('click', resetVisualization);

    const arraySizeSlider = document.getElementById('arraySize');
    const arraySizeValueSpan = document.getElementById('arraySizeValue');
    arraySizeSlider.addEventListener('input', (e) => {
        arraySize = parseInt(e.target.value);
        arraySizeValueSpan.textContent = arraySize;
        resetVisualization(); // Generate new array when size changes
    });

    const animationSpeedSlider = document.getElementById('animationSpeed');
    const animationSpeedValueSpan = document.getElementById('animationSpeedValue');
    animationSpeedSlider.addEventListener('input', (e) => {
        animationSpeed = parseInt(e.target.value);
        animationSpeedValueSpan.textContent = animationSpeed;
    });

    // Initial setup
    generateNewArray();
};

// Ensure the DOM is fully loaded before initializing
document.addEventListener('DOMContentLoaded', initializeApp);

// Optional: Handle window resize for canvas responsiveness (basic example)
window.addEventListener('resize', () => {
    if (canvas) {
        const parentWidth = canvas.parentElement.clientWidth;
        canvas.width = Math.min(900, parentWidth * 0.95);
        canvas.height = Math.min(500, canvas.width * (5/9));
        drawArray(); // Redraw array on resize
    }
});
