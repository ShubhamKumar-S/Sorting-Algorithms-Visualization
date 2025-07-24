# Sorting Algorithm Visualizer
This is an interactive web-based application that visually demonstrates how various sorting algorithms work. It's designed to help users understand the step-by-step execution, efficiency, and characteristics of different sorting techniques through dynamic visualizations.

## Table of Contents

- [Features](#features)
- [Algorithms Implemented](#algorithms-implemented)
- [How to Run](#how-to-run)
- [Technologies Used](#technologies-used)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)

## Features

- **Multiple Algorithms:** Visualize Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort, and Heap Sort.
- **Dynamic Array Generation:** Generate new arrays with random values and adjustable sizes (from 10 to 200 elements).
- **Speed Control:** Adjust the animation speed to observe the sorting process at your preferred pace.
- **Real-time Metrics:** Track and display the number of comparisons and swaps/moves performed by the algorithm.
- **Complexity Display:** See the time and space complexity (Big O notation) for each selected algorithm.
- **Intuitive Visualization:** Elements are represented as color-coded bars, providing clear visual feedback:
  - 🟦 **Blue:** Default unsorted elements.
  - 🟧 **Amber (Orange):** Elements currently being compared.
  - 🔴 **Red:** The pivot element (in Quick Sort).
  - 🟪 **Violet (Purple):** Elements being swapped.
  - 🟩 **Emerald (Green):** Elements that are in their final sorted position.
- **Responsive Design:** The application's layout adapts seamlessly to various screen sizes.


## Algorithms Implemented

- Bubble Sort  
- Selection Sort  
- Insertion Sort  
- Merge Sort  
- Quick Sort  
- Heap Sort

## How to Run

1. **Clone the repository:**
git clone https://github.com/YourUsername/sorting-algorithm-visualizer.git
2. **Navigate to the Project Folder:**
cd sorting-algorithm-visualizer

**Open index.html:**
Simply open the index.html file in your preferred web browser. No local server is required.

## Technologies Used
- **HTML5:** For the basic structure of the web page.
- **CSS3 (with Tailwind CSS CDN):** For styling and responsive design.
- **JavaScript (ES6+):** For implementing sorting algorithms, canvas drawing, and interactive logic.

## Future Enhancements
- **Step-by-Step Mode:** Add a button to advance the algorithm one step at a time.
- **Custom Input:** Allow users to input their own array of numbers.
- **Pause/Resume Functionality:** Implement a robust pause and resume feature for ongoing sorts.
- **Algorithm Explanations:** Display dynamic text explaining the current step of the algorithm.
- **Sound Effects:** Add subtle audio cues for comparisons and swaps.
- **More Algorithms:** Include additional sorting algorithms (e.g., Counting Sort, Radix Sort).
- **Performance Comparison Graph:** Visualize the actual performance (time/operations) of different algorithms on the same dataset.

## Contributing
Feel free to fork this repository, open issues, or submit pull requests to improve the project!
