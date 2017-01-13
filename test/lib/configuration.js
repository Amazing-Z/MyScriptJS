const path = require('path');
const fs = require('fs');

const languages = require('./languages.json');

const backendHost = process.env.BACKEND_URL || 'http://localhost:8080';
const resourcesFolder = process.env.NIGHTWATCH_RESOURCES_FOLDER || '../files';
const outputFolder = process.env.NIGHTWATCH_OUTPUT_FOLDER || './results';
const timeoutAmplificator = process.env.NIGHTWATCH_TIMEOUT_FACTOR || 1;

const equation = [[[530, 533, 537, 538, 540, 541, 542, 544, 545, 546, 548, 548, 552, 555, 558, 561, 565, 569, 573, 577, 582, 583, 585, 588, 589, 591, 593, 593, 593, 592, 591, 591, 590, 589, 588, 593, 598, 604, 613, 627, 646, 665, 682, 697, 713, 727, 738, 745, 751, 756, 762, 768, 772], [93, 95, 99, 102, 107, 112, 117, 123, 127, 130, 133, 136, 138, 141, 143, 144, 144, 141, 136, 130, 124, 118, 112, 107, 101, 95, 90, 84, 79, 76, 72, 68, 64, 59, 55, 54, 54, 54, 54, 54, 52, 52, 49, 49, 49, 49, 49, 49, 49, 49, 49, 48, 48]], [[669, 666, 665, 665, 668, 672, 676, 680, 684, 687, 689, 689, 690, 690, 688, 686, 684, 681, 678, 675, 670, 667, 664, 661, 658, 655, 654, 657, 661, 664, 668, 672, 677, 682, 689, 700, 712, 720, 723, 720], [81, 80, 77, 74, 75, 76, 77, 79, 81, 84, 87, 90, 93, 97, 102, 105, 109, 112, 114, 118, 121, 123, 125, 127, 130, 133, 136, 137, 138, 138, 138, 138, 138, 137, 136, 136, 135, 133, 133, 132]]];
const hello = [[[29, 29, 29, 30, 30, 31, 32, 33, 34, 35, 35, 36, 36, 37, 37, 38, 38, 39, 40, 43, 45, 48, 50, 53, 56, 59, 62, 65, 68, 70, 71, 72, 72, 73, 75, 78, 83, 90, 97, 104, 112, 118, 124, 129, 131, 132, 131, 129, 126, 123, 119, 115, 111, 109, 109, 111, 115, 120, 126, 133, 139, 145, 151], [12, 16, 20, 28, 37, 49, 62, 76, 89, 102, 113, 121, 127, 131, 128, 121, 110, 97, 83, 72, 63, 56, 52, 49, 48, 48, 50, 54, 60, 68, 77, 87, 96, 104, 109, 113, 117, 119, 119, 117, 114, 108, 101, 94, 86, 78, 71, 64, 60, 59, 62, 68, 77, 88, 98, 107, 113, 117, 119, 120, 120, 117, 113]], [[164, 164, 165, 165, 165, 166, 167, 169, 170, 171, 173, 174, 175], [26, 30, 36, 44, 52, 62, 71, 81, 91, 99, 107, 113, 117]], [[199, 199, 199, 199, 200, 201, 203, 205, 207, 209, 211, 213, 215, 216], [20, 25, 30, 36, 44, 52, 61, 71, 81, 92, 102, 111, 116, 119]], [[263, 263, 259, 255, 251, 246, 242, 239, 236, 234, 233, 234, 236, 241, 248, 257, 268, 279, 289, 295, 298, 297, 293, 287, 281, 274, 267], [65, 62, 60, 60, 60, 62, 66, 70, 76, 84, 91, 99, 106, 113, 119, 122, 123, 121, 116, 109, 100, 91, 83, 75, 70, 66, 65]]];
const fourSquare = [[[122, 902], [-65, -65]], [[902, 902], [-65, 480]], [[902, 122], [480, 480]], [[122, 122], [480, -65]], [[122, 902], [200, 200]], [[138, 139, 140, 141, 143, 144, 145, 146, 146, 147, 147, 147, 147, 147, 147, 147, 147, 147, 148, 148, 148, 149, 149, 149, 151, 154, 158, 161, 165, 169, 173, 177, 183, 189, 194, 198, 203, 208, 213, 218, 223, 229, 234, 240, 246, 251, 257, 263, 269, 276, 283, 288, 293, 298, 302, 307, 312, 318, 322, 325, 329, 333, 337, 341, 344, 348, 353, 356, 358, 359, 360, 360, 360, 360, 360, 361, 362, 363, 364, 365, 365, 366, 366, 366, 367, 367, 368, 368, 369, 369, 370, 370, 370, 369, 365, 359, 354, 348, 343, 336, 329, 323, 317, 309, 301, 295, 289, 284, 279, 273, 267, 261, 253, 244, 238, 231, 223, 215, 210, 206, 201, 194, 187, 180, 174, 169, 164, 159, 154, 151, 147, 144, 141, 137, 134, 133], [-30, -23, -17, -11, -5, -1, 5, 10, 16, 21, 25, 31, 36, 40, 44, 48, 51, 54, 57, 60, 63, 66, 69, 72, 73, 73, 73, 73, 73, 73, 73, 72, 71, 70, 69, 69, 68, 67, 67, 66, 66, 66, 67, 68, 69, 70, 71, 72, 73, 73, 73, 73, 73, 72, 71, 70, 68, 67, 66, 66, 65, 65, 65, 65, 65, 66, 67, 68, 69, 66, 61, 55, 47, 39, 31, 23, 17, 10, 4, -3, -8, -14, -18, -21, -25, -28, -32, -36, -41, -44, -47, -50, -53, -55, -54, -52, -49, -47, -45, -43, -41, -39, -38, -36, -35, -33, -33, -32, -32, -32, -31, -31, -31, -31, -31, -31, -31, -31, -31, -30, -30, -30, -30, -30, -31, -31, -32, -33, -33, -34, -34, -34, -34, -35, -35, -35]], [[191, 190, 189, 188, 188, 188, 188, 190, 193, 195], [40, 39, 35, 31, 28, 25, 22, 20, 19, 18]], [[202, 212, 213, 213, 210, 207, 204, 203, 203, 204, 208, 212, 216], [36, 32, 28, 25, 24, 24, 26, 29, 34, 38, 42, 43, 43]], [[224, 218, 222, 227, 231], [19, 30, 33, 34, 34]], [[229, 233, 236, 238, 240, 240, 239, 238, 237, 235, 237, 241, 244, 247], [1, 16, 24, 30, 34, 35, 32, 29, 26, 23, 21, 21, 21, 21]], [[251, 245, 247, 251, 255, 258, 259, 259, 257, 254, 252, 250], [32, 41, 44, 45, 45, 42, 38, 34, 31, 30, 31, 33]], [[261, 262, 263, 265], [35, 41, 45, 46]], [[270, 272, 272, 273, 273, 273, 275, 278, 281, 283, 284, 284, 284, 285], [29, 42, 39, 36, 33, 30, 28, 26, 25, 27, 31, 36, 39, 41]], [[299, 293, 291, 291, 291, 292, 294, 298, 301, 302, 302, 300, 298, 297], [23, 26, 29, 33, 37, 41, 42, 43, 40, 35, 30, 26, 28, 31]], [[303, 307, 312, 312, 312, 311, 308, 306, 305, 305, 306, 308, 310, 312], [31, 32, 47, 55, 60, 63, 63, 61, 58, 54, 50, 47, 44, 43]], [[321, 323, 323, 322, 321, 319, 317, 316, 315, 315, 315, 316, 317, 318], [13, 6, 1, -3, -6, -8, -10, -7, -1, 5, 11, 17, 22, 26]], [[324, 335, 337, 336, 333, 330, 329, 329, 330, 332, 336, 340, 344], [27, 23, 19, 16, 16, 16, 19, 23, 29, 35, 39, 41, 41]], [[536, 543, 547, 550, 553, 557, 561, 564, 568, 572, 577, 580, 584, 588, 592, 595, 597, 598, 600, 601, 603, 605, 606, 607, 609, 611, 613, 616, 619, 622, 625, 629, 632, 636, 639, 643, 647, 652, 657, 662, 667, 672, 677, 683, 689, 695, 701, 706, 713, 719, 725, 731, 736, 740, 744, 747, 750, 752, 754, 757, 761, 764, 767, 769, 768, 765, 759, 754, 748, 742, 735, 728, 724, 719, 713, 706, 700, 694, 688, 683, 677, 671, 665, 659, 654, 648, 642, 637, 633, 628, 621, 614, 609, 603, 597, 590, 582, 575, 569, 565, 561, 558, 554, 550, 546, 543, 540, 537, 534, 533], [129, 113, 102, 91, 79, 68, 58, 49, 41, 33, 26, 20, 14, 8, 2, -3, -7, -10, -13, -16, -19, -22, -25, -28, -29, -27, -24, -22, -19, -15, -11, -7, -4, 0, 3, 6, 10, 15, 20, 25, 32, 39, 46, 54, 62, 70, 78, 85, 91, 96, 100, 104, 108, 112, 116, 119, 121, 122, 124, 125, 127, 128, 128, 129, 129, 129, 129, 129, 129, 129, 129, 129, 129, 129, 129, 129, 129, 129, 130, 131, 132, 133, 134, 136, 137, 139, 140, 141, 142, 142, 142, 143, 143, 143, 143, 143, 141, 141, 140, 138, 137, 136, 135, 134, 133, 133, 132, 131, 131, 129]], [[567, 567, 568, 571, 573, 574, 576, 576], [73, 78, 94, 103, 108, 111, 108, 105]], [[567], [98]], [[579, 583, 585, 585, 584, 583, 582, 582, 582, 585, 589, 591], [102, 113, 115, 115, 112, 109, 105, 101, 97, 95, 94, 95]], [[594, 600, 601, 601], [98, 112, 111, 106]], [[588], [77]], [[607, 604, 603, 607, 611, 615, 617, 617, 616, 613, 610, 608, 610], [98, 95, 107, 109, 110, 107, 103, 99, 95, 93, 93, 95, 96]], [[616, 621, 623], [95, 109, 111]], [[628, 633, 636, 637, 638, 638, 639, 640], [107, 89, 89, 92, 95, 98, 100, 97]], [[645, 646, 649, 651, 653, 654, 654, 653, 651, 650, 653, 655, 658, 659, 660, 658, 655, 651, 650, 651, 653, 656, 655], [97, 104, 106, 105, 102, 98, 93, 90, 87, 90, 95, 101, 108, 114, 119, 121, 121, 120, 117, 114, 111, 109, 109]], [[663, 665, 664, 662, 660, 657, 655, 655, 655, 655, 656, 658, 659, 661, 663, 664, 664, 665, 665, 665], [81, 64, 58, 54, 52, 50, 50, 54, 60, 68, 77, 84, 90, 95, 99, 102, 105, 102, 98, 95]], [[674, 678, 678, 678, 675, 672, 670, 669, 669, 670, 672, 674, 677, 681, 684, 684], [98, 88, 84, 81, 81, 82, 86, 90, 95, 99, 102, 105, 107, 107, 106, 103]], [[278, 267, 257, 249, 240, 231, 223, 216, 210, 204, 198, 193, 189, 186, 185, 184, 184, 184, 185, 188, 192, 196, 202, 208, 215, 222, 230, 237, 244, 252, 259, 267, 276, 285, 292, 299, 307, 316, 325, 335, 345, 355, 366, 376, 384, 391, 397, 403, 408, 414, 420, 426, 432, 438, 444, 449, 456, 466, 475, 483, 489, 495, 500, 504, 508, 512, 515, 517, 518, 519, 519, 520, 520, 520, 520, 520, 519, 518, 515, 511, 507, 501, 494, 485, 474, 464, 454, 445, 436, 429, 423, 415, 408, 401, 395, 389, 382, 375, 367, 359, 348, 337, 329, 323, 318, 312, 306, 300, 296, 293, 290, 287, 284, 281, 278, 276, 274, 274], [404, 401, 399, 398, 397, 395, 393, 391, 387, 380, 372, 361, 350, 338, 327, 317, 309, 303, 296, 290, 285, 280, 275, 271, 267, 264, 260, 258, 256, 253, 250, 247, 244, 241, 239, 237, 235, 232, 230, 228, 227, 226, 225, 223, 223, 223, 223, 225, 226, 229, 232, 235, 237, 240, 243, 246, 249, 252, 254, 256, 259, 263, 268, 273, 279, 285, 291, 297, 303, 310, 317, 324, 330, 338, 347, 356, 363, 369, 375, 380, 384, 387, 390, 393, 396, 398, 399, 400, 401, 402, 402, 402, 403, 403, 403, 403, 403, 403, 404, 404, 404, 405, 405, 405, 405, 405, 405, 406, 406, 406, 407, 407, 407, 407, 407, 406, 404, 399]], [[246, 257, 260, 261, 261, 258, 254, 249, 245, 244, 244, 249, 256, 263, 269, 271, 271, 272], [335, 332, 326, 319, 312, 309, 308, 309, 315, 323, 332, 341, 348, 351, 350, 345, 338, 333]], [[288, 287, 283, 279, 277, 277, 277, 280, 284, 287, 291, 295, 297, 299, 300, 301, 303], [285, 276, 269, 266, 267, 273, 281, 291, 301, 311, 322, 330, 336, 337, 331, 324, 321]], [[313, 318, 321, 322, 321, 320], [324, 339, 344, 345, 340, 333]], [[302], [298]], [[336, 345, 352, 358, 361, 362, 358, 353, 348, 343, 341, 341, 345, 352, 359, 365, 370, 369, 363, 356, 352, 351, 357, 365], [331, 347, 359, 368, 373, 373, 367, 357, 345, 334, 323, 315, 309, 307, 307, 311, 317, 324, 331, 336, 337, 336, 334, 331]], [[384, 374, 379, 386, 394, 400, 403, 404, 404, 400, 396, 395], [298, 307, 314, 317, 319, 321, 324, 330, 337, 340, 341, 339]], [[411, 422, 426, 426, 425, 422, 417, 413, 412, 411, 410, 411, 413, 419, 428, 434, 435, 431], [315, 309, 303, 299, 295, 292, 292, 293, 296, 301, 308, 317, 326, 332, 335, 335, 332, 323]], [[768, 758, 753, 749, 746, 743, 740, 736, 733, 730, 727, 725, 724, 724, 723, 723, 724, 726, 729, 732, 737, 743, 749, 755, 761, 767, 774, 781, 788, 796, 802, 810, 818, 826, 834, 841, 847, 853, 858, 863, 867, 871, 874, 877, 879, 880, 881, 882, 882, 882, 882, 882, 881, 879, 876, 873, 869, 865, 859, 852, 845, 838, 830, 822, 813, 805, 798, 792, 787, 781, 776, 772, 768, 765, 763, 761, 760, 759, 757, 756, 755, 759, 762, 763, 760, 755, 751, 747], [284, 285, 288, 292, 296, 300, 306, 311, 317, 324, 332, 341, 351, 360, 369, 377, 384, 391, 397, 404, 410, 417, 422, 426, 430, 432, 433, 434, 434, 433, 432, 432, 430, 428, 426, 424, 420, 417, 413, 409, 404, 398, 392, 385, 378, 370, 360, 351, 341, 332, 323, 314, 306, 299, 292, 286, 281, 277, 274, 272, 271, 271, 271, 271, 271, 271, 271, 272, 273, 273, 274, 276, 279, 282, 287, 291, 295, 299, 302, 305, 308, 301, 294, 290, 290, 291, 292, 294]], [[757, 747, 746, 749, 752, 756, 759], [357, 367, 374, 377, 378, 378, 378]], [[772, 773, 774, 774], [367, 374, 377, 375]], [[782, 788, 789, 787, 785, 784, 784, 786, 789, 792, 795, 798], [364, 377, 380, 378, 374, 369, 365, 362, 360, 358, 358, 359]], [[810, 800, 800, 803, 807, 812, 815, 817], [354, 367, 373, 377, 378, 378, 377, 374]], [[835, 832, 830, 828, 825, 823, 821, 820, 820, 820, 821, 823, 825, 826, 828, 829, 831, 833, 837, 840], [320, 314, 309, 307, 306, 308, 312, 319, 327, 336, 346, 354, 362, 369, 373, 376, 377, 378, 378, 374]]];
const music = [[[162, 166, 171, 175, 178, 183, 185], [94, 94, 94, 94, 94, 94, 94]], [[176, 174, 172, 169, 169, 169, 169, 169, 171, 173, 176, 178, 180, 180, 181, 181, 181, 181, 181, 179, 177, 176], [89, 89, 89, 91, 93, 95, 98, 99, 101, 101, 102, 102, 102, 101, 98, 96, 94, 92, 91, 91, 91, 89]], [[183, 183, 183, 183, 183, 183, 183, 183, 184, 185, 185, 185, 185], [92, 87, 79, 68, 60, 55, 48, 40, 30, 20, 13, 7, 6]], [[217, 216, 216, 216, 217, 218, 218, 219, 218, 216, 216, 216, 216, 216, 216, 216, 216, 216, 218, 218, 218, 218, 218, 220, 222, 223, 223, 222, 221, 220, 220, 220, 220, 220, 220, 217, 217, 217, 218, 220, 220, 220, 220, 219, 218, 216, 216, 219, 220, 220, 219, 217, 215, 214, 214, 215, 219, 221, 222, 223, 223, 223, 220, 218, 216, 214, 214, 214, 216, 218, 218, 220, 221, 220, 220, 220], [4, 7, 9, 11, 12, 10, 8, 6, 5, 7, 9, 12, 14, 11, 7, 7, 13, 15, 15, 13, 9, 7, 9, 12, 11, 9, 6, 4, 6, 8, 11, 13, 13, 10, 7, 8, 11, 13, 14, 13, 11, 9, 7, 7, 9, 13, 15, 14, 12, 10, 9, 9, 11, 13, 15, 16, 16, 14, 13, 11, 9, 7, 7, 7, 8, 9, 12, 15, 16, 13, 11, 6, 7, 10, 13, 11]], [[222, 222, 222, 222, 222, 222, 222, 222, 222, 222], [6, 2, -3, -11, -20, -31, -39, -47, -52, -55]], [[194, 194, 194, 195, 195, 195, 195, 195, 197, 197, 198, 199, 199, 198, 198, 197, 198, 200, 202, 202, 202, 202, 201], [-16, -12, -10, -7, -5, -1, 1, 2, 4, 7, 9, 12, 14, 14, 12, 9, 7, 7, 7, 9, 11, 13, 14]], [[241, 241, 240, 240, 240, 240, 239, 238, 238, 238, 238, 238, 238, 238, 238, 238, 238, 238, 238, 238, 238, 238, 238, 238, 238, 239, 240, 242, 242, 242, 242], [-2, 0, 4, 7, 11, 17, 22, 26, 28, 31, 33, 37, 39, 41, 43, 46, 48, 50, 52, 54, 56, 59, 61, 63, 65, 67, 70, 72, 75, 78, 80]], [[247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 247, 248, 249, 249, 249, 249, 249, 250, 251], [-1, 3, 7, 12, 18, 23, 27, 31, 33, 37, 39, 40, 42, 44, 46, 48, 51, 54, 56, 59, 62, 65, 66, 69, 71, 73, 76, 79, 80, 82, 80]], [[63, 62, 63, 63, 63, 62, 61, 61, 61, 62, 62, 62, 62, 62, 63, 63, 62, 61, 60, 60, 61, 62, 62, 63, 63, 62, 62, 62, 63, 64, 63, 62, 62, 61, 60, 60, 62, 63, 63, 63, 63, 62, 62, 62, 63, 63, 62, 61, 61, 61, 62, 62, 61, 61, 62, 62, 62, 63, 63, 63, 62, 61, 61, 61, 62, 63, 63, 63, 62, 61, 60, 60, 61, 62, 63, 62, 61, 60, 60, 60, 62, 62], [78, 79, 79, 78, 77, 77, 78, 78, 78, 78, 78, 77, 78, 79, 79, 78, 77, 77, 78, 79, 79, 79, 78, 78, 77, 77, 78, 79, 79, 78, 78, 78, 78, 78, 79, 80, 80, 80, 79, 78, 77, 78, 78, 79, 79, 78, 78, 79, 80, 80, 80, 79, 79, 79, 79, 79, 78, 78, 77, 77, 77, 77, 78, 79, 79, 78, 77, 76, 76, 77, 77, 78, 78, 78, 78, 77, 77, 78, 78, 79, 79, 79]], [[113, 113, 114, 115, 116, 116, 116, 114, 114, 112, 111, 110, 110, 110, 112, 113, 114, 115, 116, 116, 116, 114, 111, 109, 110, 111, 114, 115, 116, 115, 113, 110, 112, 114, 115, 114, 114, 112, 112, 113, 114, 114, 114, 113, 112, 111, 110, 110, 111, 112, 113, 114, 115, 114], [57, 58, 58, 58, 58, 58, 57, 56, 56, 56, 56, 57, 58, 58, 59, 59, 59, 59, 58, 58, 57, 57, 57, 57, 58, 58, 59, 59, 59, 58, 58, 58, 58, 58, 58, 57, 57, 58, 58, 58, 58, 58, 57, 57, 57, 57, 57, 58, 58, 58, 58, 58, 58, 58]], [[63, 63, 63, 63, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 63, 63, 63, 63, 64, 64, 64, 65, 65, 65, 65, 64, 64, 64, 64, 64, 64, 65, 65, 65, 65, 65, 65, 65, 65, 65, 66, 67, 68, 70, 72, 75, 78, 80, 83, 85, 86, 88, 91, 92, 93, 95, 97, 99, 100, 101, 102, 104, 106, 107, 109, 109, 111, 111, 111, 112, 112, 113, 113, 113, 113, 114, 114, 114, 114, 114, 114, 114, 114, 114, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 115, 114, 114, 114], [77, 76, 74, 71, 68, 67, 65, 63, 59, 58, 55, 53, 50, 49, 48, 46, 45, 43, 41, 39, 36, 33, 32, 31, 30, 27, 25, 23, 22, 20, 18, 16, 14, 13, 11, 10, 8, 6, 5, 4, 2, 1, -1, -2, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -3, -4, -4, -4, -4, -4, -5, -6, -6, -6, -6, -6, -6, -6, -6, -7, -5, -3, -1, 1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 14, 15, 17, 19, 20, 22, 24, 26, 27, 29, 30, 32, 34, 36, 37, 40, 41, 43, 45, 46, 48, 50, 51, 52, 53, 55, 56, 58, 59]]];

const walkSync = (dir, fileList) => {
  let fileListRef = fileList || [];
  fs.readdirSync(dir).forEach((file) => {
    const filename = `${dir}/${file}`;
    if (fs.statSync(filename).isDirectory()) {
      fileListRef = walkSync(filename, fileListRef);
    } else {
      fileListRef.push(filename);
    }
  });
  return fileListRef;
};

const commonConfig = {
  componentPath: '/common_demo/bower_components/myscript-common-element/demo/index.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'common'))
};

const mathConfig = {
  componentPath: '/math_demo/bower_components/myscript-math-web/demo/index.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'math'))
};

const superimposedConfig = {
  componentPath: '/text_demo/bower_components/myscript-text-web/demo/superimposed.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'text/superimposed'))
};

const textConfig = {
  componentPath: '/text_demo/bower_components/myscript-text-web/demo/index.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'text/multiline'))
};

const mathRestSample = {
  componentPath: '/samples/rest_math.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'math')),
  inks: [{ strokes: equation, labels: ['r', '\\sqrt {2}'] }],
};

const mathWSSample = {
  componentPath: '/samples/websocket_math.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'math')),
  inks: [{ strokes: equation, labels: ['r', '\\sqrt {2}'] }],
};

const textRestSample = {
  componentPath: '/samples/rest_text.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'text')),
  inks: [{ strokes: hello, labels: ['he', 'hel', 'hell', 'hello'] }],
};

const textWSSample = {
  componentPath: '/samples/websocket_text.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'text')),
  inks: [{ strokes: hello, labels: ['he', 'hel', 'hell', 'hello'] }],
};

const shapeRestSample = {
  componentPath: '/samples/rest_shape.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'text')),
  inks: [{ strokes: hello, labels: ['notRecognized', 'line,notRecognized', 'line,line,notRecognized', 'circle,line,line,notRecognized'] }],
};

// WARN : the expected on the undo is very very strange. I did not expect that have to see if it is a predictable behaviour.
const analyzerRestSample = {
  componentPath: '/samples/rest_analyzer.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'text')),
  inks: [{ strokes: fourSquare, labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', 'circle,ellipse,groups:2', 'circle,ellipse,groups:2,isosceles triangle,rectangle,tables:2,txt:c. rd,txt:elipse,txt:rectangle,txt:triangle'] }],
};
const musicRestSample = {
  componentPath: '/samples/rest_music.html',
  getFiles: () => walkSync(path.resolve(resourcesFolder, 'text')),
  inks: [{ strokes: music, labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '<step>F</step>', '<step>C</step>'] }],
};

module.exports = {
  languages,
  backendHost,
  resourcesFolder,
  outputFolder,
  timeoutAmplificator,
  commonConfig,
  mathConfig,
  superimposedConfig,
  textConfig,
  mathRestSample,
  mathWSSample,
  textRestSample,
  textWSSample,
  shapeRestSample,
  musicRestSample,
  analyzerRestSample
};
