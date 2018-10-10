#ifndef PARSER_FILE
#define PARSER_FILE

char* returnfromstat(struct dirent *pdir, int index);
char* returnvmem(struct dirent *pdir);
char* returncmdline(struct dirent *pdir);

#endif
