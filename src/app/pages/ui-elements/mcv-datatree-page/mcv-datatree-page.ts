import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { McvDatatree, McvDatatreeNode } from '../../../shared/components/ui/mcv-datatree/mcv-datatree';

@Component({
    selector: 'app-mcv-datatree-page',
    standalone: true,
    imports: [CommonModule, McvDatatree, FormsModule],
    templateUrl: './mcv-datatree-page.html',
    styleUrl: './mcv-datatree-page.css'
})
export class McvDatatreePage {
    isReadOnly = false;
    rbacAdd = true;
    rbacEdit = true;
    rbacDelete = true;
    rbacExpandCollapse = true;

    treeData: McvDatatreeNode[] = [
        // {
        //     id: '1',
        //     label: 'Google',
        //     url: 'https://www.google.com',
        //     expanded: true,
        //     children: [
        //         {
        //             id: '1.1',
        //             label: 'Gmail',
        //             url: 'https://mail.google.com',
        //         },
        //         {
        //             id: '1.2',
        //             label: 'Calendar',
        //             url: 'https://calendar.google.com',
        //         }
        //     ]
        // },
        // {
        //     id: '2',
        //     label: 'GitHub',
        //     url: 'https://github.com',
        //     children: [
        //         { id: '2.1', label: 'My Repositories', url: 'https://github.com?tab=repositories' }
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
