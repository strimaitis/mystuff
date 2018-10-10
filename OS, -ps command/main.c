#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <dirent.h>
#include <errno.h>
#include "main.h"
#include "parser.h"
#include "printer.h"

int main(int argc, char *argv[]) {
	// For '537ps': No additional arguments
	if (argc == 1) {
		formatall();
		return 0;
	}

	// Error handling non-optional, invalid inputs after '537ps'
	// Check that PID is a number
        for (int i = 1; i < argc - 1; i++) {
                        if(strcmp("-p", argv[i]) == 0) {
                                if(atoi(argv[i+1]) == 0) {
                                        printf("ERROR: PID must be a number\n");
                                        exit(1);
                                }
                }
        }

        int pid;
        struct dirent* mydirent;
	// Flags will determined print statement
	int stateflag, utimeflag, stimeflag, clineflag, vmemflag = 0;

        int ch;
        while ((ch = getopt(argc, argv, "s::U::S::v::c::p:")) != -1) { 
                switch (ch) {
		// Check for valid PID, set default flags
                case 'p':
			pid = atoi(optarg);
        		mydirent = pdirent(pid);
			utimeflag = 1;
			clineflag = 1;
                        break;
		// Sets state flag
                case 's':
			stateflag = 1;
			if(optarg != NULL) { 
				if(strcmp(optarg, "-") == 0) {
					stateflag = 0;
				}
			}
                        break;
		// Sets user time flag
                case 'U':
			if(optarg != NULL) {
                                if(strcmp(optarg, "-") == 0) {
                                        utimeflag = 0;
                                }
                        }
                        break;
		// Sets system time flag
                case 'S':
			stimeflag = 1;
			if(optarg != NULL) {
                                if(strcmp(optarg, "-") == 0) {
                                        stimeflag = 0;
                                }
                        }
                        break;
		// Sets virtual memory flag
                case 'v':
			vmemflag = 1;
			if(optarg != NULL) {
                                if(strcmp(optarg, "-") == 0) {
                                        vmemflag = 0;
                                }
                        }
                        break;
		// Sets command line flag
                case 'c':
			if(optarg != NULL) { 
                                if(strcmp(optarg, "-") == 0) {
                                        clineflag = 0;
                                }
                        }
                        break;
                // Invalid inputs
		default:
                        exit(1);
                        break;
                }
        }
	// Error checking: Ensures '537ps ... -p <pid>' format

	// Calls string formatter
	formatter(utimeflag, clineflag, stateflag, stimeflag, vmemflag, mydirent);
}

struct dirent* pdirent(int pid) {
        DIR *myDirectory;
        struct dirent *myFile;
        struct dirent *returnFile;
        int flag = 0;
        myDirectory = opendir("/proc");
	// Reads (/proc) directory
         if (myDirectory) {

            while ((myFile = readdir(myDirectory)))

		// If file w/ PID matching shell line PID
                if(atoi(myFile->d_name) == pid) {
			// Sets returnfile to dirent
                        returnFile = myFile;
			// Set flag to 1, indicating valid shell line PID
                        flag = 1;
                }

            if (closedir(myDirectory) == 0);

            else
                printf("Directory cannot be closed");
        }


        if (flag == 1) {
                
        } else {
		// Invalid shell line PID will end program
                formatall();
		exit(1);
        }

	return returnFile;
}
