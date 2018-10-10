#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <dirent.h>
#include <errno.h>
#include "parser.h"
#define CHAR_BUF_LEN 256

void formatter(int utime, int cline, int state, int stime, int vmem, struct dirent* mydirent) {
       
	printf("%s:", mydirent->d_name);

        // Print state info if state flag = 1
        if(state == 1) {
                printf(" %s", returnfromstat(mydirent, 3));
        }

        // Print utime if utime flag = 1
        if(utime == 1) {
                printf(" utime=%s", returnfromstat(mydirent, 14));
        }

        // Print stime if stime flag = 1
        if(stime == 1) {
                printf(" stime=%s", returnfromstat(mydirent, 15));
        }

        // Print vmem if vmem flag = 1
        if(vmem == 1) {
                printf(" vmemory=%s", returnvmem(mydirent));
        }

        // Print cline if cline flag = 1
        if(cline == 1) {
                printf(" [%s]", returncmdline(mydirent));
        }

        printf("\n");
}

void formatall() {
	DIR *myDirectory;
        struct dirent *myFile;
        myDirectory = opendir("/proc");
        // Reads (/proc) directory
         if (myDirectory) {

            while ((myFile = readdir(myDirectory)))
	
		    // If PID value is a number (non-zero)
		    if(atoi(myFile->d_name) != 0) {
			    // Print for each dirent
			    printf("%s: utime=%s [%s]\n", myFile->d_name, returnfromstat(myFile, 14), returncmdline(myFile));
		    }

            if (closedir(myDirectory) == 0);

            else
                printf("Directory cannot be closed");
        }


}       
