/// <reference path="./index.ts" />
module BeautylogOsTable {
    export var cliTable;
    export function init() {
        cliTable =  require("cli-table2");
        var beautylogOsTable:any = {};

        beautylogOsTable.new = function(type:string) {
            var newConsoleTable = new ConsoleTable(type);
            return newConsoleTable;
        };
        return beautylogOsTable;
    }
}