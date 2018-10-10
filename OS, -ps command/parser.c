#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <dirent.h>
#include <errno.h>
#include "parser.h"
#define CHAR_BUF_LEN 256

char* returnfromstat(struct dirent *pdir, int index) {
	// Define character buffers for state, utime, stime
	char statebuffer[CHAR_BUF_LEN];
	char utimebuffer[CHAR_BUF_LEN];
	char stimebuffer[CHAR_BUF_LEN];

	// Get dirent PID
	char *pid;
        pid = pdir->d_name;
	
	// Set filepointer to "/proc/<pid>/stat"
        FILE *fp;
        char str[CHAR_BUF_LEN];
        strcpy(str, "/proc/");
        strcat(str, pid);
        strcat(str, "/stat");
        fp = fopen(str, "r");

	// Scan state, utime, and stime values into respective buffers
        if(fp != NULL) {
                fscanf(fp, "%*s %*s %s", statebuffer);
                fscanf(fp, "%*s %*s %*s %*s %*s %*s %*s %*s %*s %*s %s ", utimebuffer);
                fscanf(fp, "%s", stimebuffer);
                fclose(fp);
        }

	// Initialize char pointer to return
	char* bufferptr = NULL;
        bufferptr = (char*) malloc(CHAR_BUF_LEN * sizeof(char));

	switch(index) {
		// Case for state flag
		case 3:
			// Set pointer to string in statebuffer
			strcpy(bufferptr, statebuffer);
			break;
		// Case for utime flag
		case 14:
			// Set pointer to string in utimebuffer
			strcpy(bufferptr, utimebuffer);
			break;
		// Case for stime flag
		case 15:
			// Set pointer to string in stimebuffer
			strcpy(bufferptr, stimebuffer);
		default:
			break;
	}

	return bufferptr;
}

char* returnvmem(struct dirent *pdir) {
	// Define character buffer for virtual memory
	char vmembuf[CHAR_BUF_LEN];

	// Get dirent PID
        char *pid;
        pid = pdir->d_name;

	// Set filepointer to "/proc/<pid>/statm"
        FILE *fp;
        char str[CHAR_BUF_LEN];
        strcpy(str, "/proc/");
        strcat(str, pid);
 	strcat(str, "/statm");
        fp = fopen(str, "r");

	// Initialize char pointer to return
        char* bufferptr = NULL;
        bufferptr = (char*) malloc(CHAR_BUF_LEN * sizeof(char));

	// Scan virtual memory value into vmembuffer
        if(fp != NULL) {
                fscanf(fp, "%s", vmembuf);
                fclose(fp);
		// Set pointer to string in vmembuffer
                strcpy(bufferptr, vmembuf);
        }

        return bufferptr;
}

char* returncmdline(struct dirent *pdir) {
	// Define character buffer for command line
	char clinebuffer[CHAR_BUF_LEN];

	// Get dirent PID
        char *pid;
        pid = pdir->d_name;

	// Set filepointer to "/proc/<pid>/cmdline"
        FILE *fp;
        char str[CHAR_BUF_LEN];
	strcpy(str, "/proc/");
        strcat(str, pid);
        strcat(str, "/cmdline");
	fp = fopen(str, "r");

	// Initialize char pointer to return
        char* bufferptr = NULL;
        bufferptr = (char*) malloc(CHAR_BUF_LEN * sizeof(char));

	// Scan command line value into clinebuffer
        if(fp != NULL) {
                fscanf(fp, "%s", clinebuffer);
                fclose(fp);
		// Set pointer to string in clinebuffer
                strcpy(bufferptr, clinebuffer);
        }

        return bufferptr;
}
