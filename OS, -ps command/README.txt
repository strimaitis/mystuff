Project structure:

As suggested, I split my project into three seperate C files with three respective header files.  These files are main.c/main.h, printer.c/printer.h, and parser.c/parser.h.
 
Main.c serves as head file, reading the shell input and computing the correct course of action.  The course of action taken by main.c is decided by the user input, as the switch loops following the getopt(..) call will parse through the appropriate cases and set flags accordingly.  Since some of these input args will not fit certain cases, error handling for invalid PIDs, options, or other types of erroneous input will be committed by this file.  Some of these important behaviors of main.c include setting flags, calling methods defined in printer.c, and calling the domestically defined function pdirent(..) to set the user requested PID to a dirent with this PID.
 
Printer.c defines functions which format printf(..) statements. It does so by taking in the flags from main and determining the correct formatted output, and calling the functions in parser.c to access the corresponding information to print.  Parser.c creates char buffers and char pointers in its methods, reads the respective /proc/<pid> directories, and returns the correct values indicated by an index parameter passed in the method or by the method name itself.
