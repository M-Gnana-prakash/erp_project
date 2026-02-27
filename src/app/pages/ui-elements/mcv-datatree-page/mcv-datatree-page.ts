import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { McvDatatree, McvDatatreeNode } from '../../../shared/components/ui/mcv-datatree/mcv-datatree';

@Component({
    selector: 'app-mcv-datatree-page',
    standalone: true,
    imports: [CommonModule, McvDatatree],
    templateUrl: './mcv-datatree-page.html',
    styleUrl: './mcv-datatree-page.css'
})
export class McvDatatreePage {
    treeData: McvDatatreeNode[] = [
        // {
        //     id: '1',
        //     label: 'node1',
        //     expanded: true,
        //     children: [
        //         {
        //             id: '1.1',
        //             label: 'node1.1',
        //             expanded: true,
        //             children: [
        //                 { id: '1.1.1', label: 'node1.1.1' }
        //             ]
        //         },
        //         { id: '1.2', label: 'node1.2' }
        //     ]
        // },
        // {
        //     id: '2',
        //     label: 'node2',
        //     children: [
        //         { id: '2.1', label: 'node2.1' },
        //         { id: '2.2', label: 'node2.2' }
        //     ]
        // },
        // {
        //     id: '3',
        //     label: 'node3',
        //     children: [
        //         { id: '3.1', label: 'node3.1' }
        //     ]
        // }
    ];

    onNodeAdd(node: McvDatatreeNode) {
        console.log('Node added:', node);
    }

    onNodeDelete(node: McvDatatreeNode) {
        console.log('Node deleted:', node);
    }

    onNodeUpdate(node: McvDatatreeNode) {
        console.log('Node updated:', node);
    }
}
