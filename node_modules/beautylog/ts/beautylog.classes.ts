/// <reference path="./index.ts" />

class ConsoleTable {
    tableHead:string[];
    rows;
    type:string;
    constructor(tableType:string) {
        switch (tableType) {
            case "checks":
                this.tableHead = ['Check Item:'.cyan,'Status:'.cyan];
                break;
            default:
                break;
        }
        this.rows = [];
        this.type = tableType;
    }
    push(row:string[]){
        this.rows.push(row);
    }
    print() {
        var table = new BeautylogOsTable.cliTable({
            head: this.tableHead,
            colWidths: [20, 20]
        });
        for (var row in this.rows){
            if(this.rows[row][1] == "success"){
                this.rows[row][1] = ' '.bgGreen + ' ' + this.rows[row][1];
            } else if (this.rows[row][1] == "error") {
                this.rows[row][1] = ' '.bgRed + ' ' + this.rows[row][1];
            }
            table.push(this.rows[row]);
        };
        console.log(table.toString());
    }
}
